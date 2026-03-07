/**
 * Lontara-USLE API Bridge
 * Menangani komunikasi antara Frontend dan Backend Flask
 * Author: Fajar Nugraha (Soil Science IPB / UNHAS)
 */

const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:5000", // Pastikan Flask berjalan di port ini
  ENDPOINTS: {
    PROCESS_USLE: "/api/process-usle",
  },
};

/**
 * Fungsi utama untuk menjalankan analisis USLE
 */
async function runUSLEAnalysis() {
  // Diambil dari map.js
  const aoi = getCurrentAOI();

  if (!aoi) {
    Swal.fire({
      title: "AOI Belum Ditentukan",
      text: "Silakan gunakan tool di pojok kiri atas untuk menggambar area analisis (poligon/kotak).",
      icon: "warning",
      confirmButtonColor: "#123b3a",
    });
    return;
  }

  // 1. Kumpulkan Parameter dari UI Dashboard
  const payload = {
    aoi: aoi.geometry.coordinates,
    rainSource: document.getElementById("rainSource").value, // Faktor R
    soilSource: document.getElementById("soilSource").value, // Faktor K
    demSource: document.getElementById("demSource").value, // Faktor LS
    landuseSource: document.getElementById("landuseSource").value, // Faktor C
    factorP: parseFloat(document.getElementById("factorP").value), // Faktor P
    year: parseInt(document.getElementById("analysisYear").value),
    outputType: document.getElementById("outputSelect").value,
  };

  console.log("🚀 Mengirim permintaan analisis ke Backend...", payload);

  // 2. Aktifkan UI State: Loading (Fungsi di ui.js)
  setLoadingState(true);

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROCESS_USLE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`Server Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Backend Anda sudah berhasil mengirimkan mapid dan token
    if (data.status === "success" && data.mapid) {
      // 3. Render Hasil ke Peta Leaflet menggunakan MapID dari GEE
      renderGEELayer(data.mapid, data.token);

      // 4. Perbarui Legenda Berdasarkan Output (Fungsi di ui.js)
      updateLegendUI(payload.outputType);

      // 5. Notifikasi Sukses Mewah menggunakan SweetAlert2
      Swal.fire({
        title: "Analisis Berhasil!",
        text: `Layer ${payload.outputType.replace("_", " ")} telah berhasil diproses oleh Earth Engine.`,
        icon: "success",
        confirmButtonColor: "#123b3a",
        timer: 3500,
      });
    } else {
      throw new Error(
        data.message || "Gagal mendapatkan data dari Earth Engine",
      );
    }
  } catch (error) {
    console.error("❌ API Error:", error);

    Swal.fire({
      title: "Gagal Memproses Data",
      text: `Terjadi kesalahan: ${error.message}. Pastikan Backend Flask sudah dijalankan.`,
      icon: "error",
      confirmButtonColor: "#123b3a",
    });
  } finally {
    // Matikan loading state apa pun hasilnya
    setLoadingState(false);
  }
}

/**
 * Merender Tile Layer dari Google Earth Engine ke Peta Leaflet
 */
function renderGEELayer(mapid, token) {
  /**
   * PERBAIKAN VITAL:
   * Menggunakan format URL legacy GEE yang paling stabil untuk Leaflet.
   * Struktur URL: /v1/projects/earthengine-legacy/maps/{mapid}/tiles/{z}/{x}/{y}
   */
  const eeTileUrl = `https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/${mapid}/tiles/{z}/{x}/{y}`;

  // Hapus layer hasil USLE sebelumnya jika ada agar tidak menumpuk
  if (window.geeLayer) {
    window.mapInstance.removeLayer(window.geeLayer);
  }

  // Tambahkan layer baru ke peta dasar global
  window.geeLayer = L.tileLayer(eeTileUrl, {
    attribution: "Google Earth Engine | Lontara-USLE",
    zIndex: 1000, // Memastikan layer berada di atas basemap satelit
    opacity: 0.85, // Memberikan sedikit transparansi
  }).addTo(window.mapInstance);

  console.log("✅ Layer GEE ditambahkan ke peta dengan MapID:", mapid);
}

// Pasang Event Listener ke tombol proses
const btnProcess = document.getElementById("btnProcess");
if (btnProcess) {
  btnProcess.addEventListener("click", runUSLEAnalysis);
}
