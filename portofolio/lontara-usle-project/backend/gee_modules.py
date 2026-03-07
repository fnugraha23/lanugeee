import ee

def calculate_usle(params):
    """
    Menghitung Laju Erosi USLE di Sub-DAS Tanralili.
    Dataset menggunakan referensi terbaru yang tersedia di GEE.
    """
    
    # 1. Inisialisasi AOI dari Frontend
    aoi = ee.Geometry.Polygon(params['aoi'])
    year = 2024 
    
    # --- FAKTOR R (Erosivitas Hujan) ---
    # Menggunakan CHIRPS v3.0 Near-Real-Time
    precip = ee.ImageCollection("UCSB-CHC/CHIRPS/V3/DAILY_SAT") \
                .filterBounds(aoi) \
                .filterDate(f"{year}-01-01", f"{year}-12-31") \
                .sum()
    r_factor = precip.multiply(0.5).rename('R')

    # --- FAKTOR K (Erodibilitas Tanah) ---
    # FIX: Memastikan hanya 1 band yang dipilih untuk menghindari error "match 6 bands"
    texture = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02") \
                .select(0) \
                .clip(aoi)
    k_factor = texture.divide(100).rename('K')

    # --- FAKTOR LS (Panjang & Kemiringan Lereng) ---
    # FIX: Band pada ALOS V4_1 adalah 'DSM', bukan 'AVE_DSM'
    if params['demSource'] == 'ALOS':
        dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V4_1") \
                .select('DSM') \
                .median() \
                .clip(aoi)
    else:
        dem = ee.Image("USGS/SRTMGL1_003").clip(aoi)
    
    slope = ee.Terrain.slope(dem)
    ls_factor = slope.divide(10).pow(1.3).rename('LS')

    # --- FAKTOR C (Tutupan Lahan) ---
    # Menggunakan ESA WorldCover 10m v200
    lc = ee.ImageCollection("ESA/WorldCover/v200") \
            .filterBounds(aoi) \
            .mosaic() \
            .clip(aoi)
    
    # Koefisien C-Factor berdasarkan klasifikasi ESA
    c_factor = lc.remap(
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100], 
        [0.01, 0.05, 0.1, 0.4, 1.0, 1.0, 0.01, 0.0, 0.01, 0.01, 0.1]
    ).rename('C')

    # --- FAKTOR P (Praktik Konservasi) ---
    p_value = float(params.get('factorP', 1.0))
    p_factor = ee.Image.constant(p_value).rename('P')

    # --- INTEGRASI FINAL USLE: A = R * K * LS * C * P ---
    erosion = r_factor.multiply(k_factor) \
                      .multiply(ls_factor) \
                      .multiply(c_factor) \
                      .multiply(p_factor) \
                      .rename('Erosion')

    # --- LOGIKA PEMILIHAN OUTPUT LAYER ---
    output_type = params.get('outputType', 'EROSION_HAZARD')
    
    if output_type == 'R_FACTOR':
        result_img, viz = r_factor, {'min': 500, 'max': 2500, 'palette': ['#e0f3f8', '#084594']}
    elif output_type == 'K_FACTOR':
        result_img, viz = k_factor, {'min': 0, 'max': 0.5, 'palette': ['#fff7bc', '#d95f0e']}
    elif output_type == 'LS_FACTOR':
        result_img, viz = ls_factor, {'min': 0, 'max': 15, 'palette': ['white', 'black']}
    elif output_type == 'C_FACTOR':
        result_img, viz = c_factor, {'min': 0, 'max': 1, 'palette': ['green', 'yellow', 'red']}
    else:
        # Default: Tingkat Bahaya Erosi (TBE)
        result_img, viz = erosion, {
            'min': 0, 'max': 500,
            'palette': ['1a9641', 'a6d96a', 'ffffbf', 'fdae61', 'd7191c']
        }

    map_info = result_img.getMapId(viz)
    
    return {
        "mapid": map_info['mapid'],
        "token": map_info['token']
    }