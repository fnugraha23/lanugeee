from flask import Flask, request, jsonify
from flask_cors import CORS
import ee
import os
from dotenv import load_dotenv
# Mengimpor logika USLE dari file gee_modules.py di folder yang sama
from gee_modules import calculate_usle

# 1. Load environment variables dari file .env
load_dotenv()

app = Flask(__name__)
# Mengizinkan akses dari frontend (CORS) agar permintaan dari browser tidak diblokir
CORS(app)

# 2. Penentuan Path Kredensial secara Dinamis
# Mengambil lokasi absolut dari folder 'backend' tempat file app.py ini berada
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Menggabungkan path folder dengan nama file credentials.json
KEY_PATH = os.path.join(BASE_DIR, 'credentials.json')

# 3. Inisialisasi Google Earth Engine dengan Service Account
def initialize_gee():
    try:
        # Mengambil email service account dari konfigurasi .env
        service_account = os.getenv('GEE_SERVICE_ACCOUNT')
        
        # Menggunakan kredensial dari file JSON yang kamu berikan
        credentials = ee.ServiceAccountCredentials(service_account, KEY_PATH)
        ee.Initialize(credentials)
        print(f"✔️ Berhasil terhubung ke GEE: {service_account}")
    except Exception as e:
        print(f"❌ Gagal Inisialisasi GEE: {e}")
        print(f"💡 Pastikan file credentials.json ada di: {KEY_PATH}")

initialize_gee()

# 4. API Endpoint untuk memproses permintaan USLE
@app.route('/api/process-usle', methods=['POST'])
def process_usle_request():
    params = request.json
    
    # Menampilkan log di CMD untuk memantau aktivitas server
    print(f"\n🚀 Menerima permintaan analisis USLE...")
    print(f"📍 Lokasi Riset: Sub-DAS Tanralili")
    print(f"📊 Parameter Terpilih:")
    print(f"   - Faktor R: {params.get('rainSource')}")
    print(f"   - Faktor LS: {params.get('demSource')}")
    print(f"   - Faktor P: {params.get('factorP')}")
    print(f"   - Tahun: {params.get('year')}")
    
    try:
        # Menjalankan fungsi perhitungan USLE dari modul gee_modules.py
        result = calculate_usle(params)
        
        print("✅ Analisis Spasial Selesai. Mengirimkan MapID ke Frontend.")
        return jsonify({
            "status": "success",
            "mapid": result['mapid'],
            "token": result['token']
        })
    except Exception as e:
        print(f"❌ Terjadi kesalahan saat pemrosesan GEE: {e}")
        return jsonify({
            "status": "error", 
            "message": str(e)
        }), 500

if __name__ == '__main__':
    # Server Flask berjalan di localhost pada port 5000
    print("\n🔥 LontaraGeo-Engine Backend siap melayani permintaan di http://127.0.0.1:5000")
    app.run(debug=True, port=5000)