/**
 * Lontara-USLE UI Controller
 * Menangani interaktivitas dashboard, loading states, dan legenda dinamis.
 * Author: Fajar Nugraha
 */

document.addEventListener("DOMContentLoaded", () => {
  const basemapToggle = document.getElementById("basemapToggle");
  const basemapMenu = document.getElementById("basemapMenu");
  const btnClear = document.getElementById("btnClear");
  const outputSelect = document.getElementById("outputSelect");

  // 1. Toggle Menu Basemap
  if (basemapToggle && basemapMenu) {
    basemapToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      basemapMenu.classList.toggle("active");
    });

    // Tutup menu jika klik di luar area menu
    document.addEventListener("click", () => {
      basemapMenu.classList.remove("active");
    });
  }

  // 2. Event Listener untuk perubahan Output Layer (Update Legenda)
  if (outputSelect) {
    outputSelect.addEventListener("change", (e) => {
      updateLegendUI(e.target.value);
    });
  }

  // 3. Logika Tombol Clear/Hapus AOI
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (window.drawnItems) {
        window.drawnItems.clearLayers();
      }
      if (window.geeLayer) {
        window.mapInstance.removeLayer(window.geeLayer);
      }
      updateAOIStatus(false); // Fungsi dari map.js
      document.getElementById("mapLegend").style.display = "none";
      console.log("Workspace dibersihkan.");
    });
  }
});

/**
 * Mengatur tampilan loading overlay saat proses GEE berjalan
 * @param {boolean} isLoading
 */
function setLoadingState(isLoading) {
  const loader = document.getElementById("loader");
  const btnProcess = document.getElementById("btnProcess");

  if (isLoading) {
    loader.style.display = "flex";
    btnProcess.disabled = true;
    btnProcess.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
  } else {
    loader.style.display = "none";
    btnProcess.disabled = false;
    btnProcess.innerHTML = '<i class="fa-solid fa-gear"></i> Run Analysis';
  }
}

/**
 * Memperbarui konten legenda berdasarkan jenis output
 * @param {string} type - EROSION_HAZARD, R_FACTOR, dll.
 */
function updateLegendUI(type) {
  const legendTitle = document.querySelector("#mapLegend h4");
  const legendContent = document.getElementById("legendContent");
  const legendBox = document.getElementById("mapLegend");

  let content = "";

  switch (type) {
    case "EROSION_HAZARD":
      legendTitle.innerText = "Tingkat Bahaya Erosi (TBE)";
      content = `
                <div class="legend-item"><div class="color-box" style="background: #1a9641"></div> Sangat Ringan</div>
                <div class="legend-item"><div class="color-box" style="background: #a6d96a"></div> Ringan</div>
                <div class="legend-item"><div class="color-box" style="background: #ffffbf"></div> Sedang</div>
                <div class="legend-item"><div class="color-box" style="background: #fdae61"></div> Berat</div>
                <div class="legend-item"><div class="color-box" style="background: #d7191c"></div> Sangat Berat</div>
            `;
      break;
    case "R_FACTOR":
      legendTitle.innerText = "Erosivitas Hujan (R)";
      content = `<div class="legend-item" style="background: linear-gradient(to right, #e0f3f8, #084594); height:15px; width:100%; border-radius:4px;"></div>
                       <div style="display:flex; justify-content:space-between; font-size:10px; margin-top:4px;"><span>Rendah</span><span>Tinggi</span></div>`;
      break;
    case "K_FACTOR":
      legendTitle.innerText = "Erodibilitas Tanah (K)";
      content = `<div class="legend-item" style="background: linear-gradient(to right, #fff7bc, #d95f0e); height:15px; width:100%; border-radius:4px;"></div>
                       <div style="display:flex; justify-content:space-between; font-size:10px; margin-top:4px;"><span>Stabil</span><span>Peka</span></div>`;
      break;
    // Tambahkan case lain jika diperlukan
    default:
      content =
        "<p style='font-size:10px;'>Legenda tersedia setelah proses.</p>";
  }

  legendContent.innerHTML = content;
  // Tampilkan legend hanya jika proses sudah pernah dijalankan
  if (window.geeLayer) legendBox.style.display = "block";
}

/**
 * Notifikasi sukses sederhana
 */
function showSuccessNotification(layerName) {
  console.log(`Layer ${layerName} berhasil dimuat.`);
  // Kamu bisa menambahkan toast notification di sini menggunakan skill desainmu
}
