/**
 * Lontara-USLE Map Engine
 * Logic for Map Initialization, Basemaps, and AOI Drawing
 * Developed by: Fajar Nugraha (Soil Science IPB / UNHAS)
 */

// 1. Variabel Global untuk sinkronisasi antar file JS
let currentAOI = null;
window.drawnItems = new L.FeatureGroup();

// 2. Inisialisasi Peta - Fokus ke Sub-DAS Tanralili, Sulawesi Selatan
window.mapInstance = L.map("map", {
  zoomControl: false,
  center: [-5.14, 119.53],
  zoom: 11,
  maxZoom: 18,
});

// Pindahkan Zoom Control ke pojok kanan atas agar tidak tertutup sidebar
L.control.zoom({ position: "topright" }).addTo(window.mapInstance);

// 3. Konfigurasi Basemap Layers
const baseLayers = {
  esri: L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, USDA, USGS",
    },
  ),
  osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }),
  carto: L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; CARTO",
    },
  ),
};

// Set basemap default (Satellite Esri)
baseLayers["esri"].addTo(window.mapInstance);

/**
 * Fungsi untuk mengganti Basemap via Switcher Custom di Dashboard
 * @param {string} type - 'esri', 'osm', atau 'carto'
 */
function changeBasemap(type) {
  // Hapus semua layer basemap yang ada
  Object.values(baseLayers).forEach((layer) => {
    if (window.mapInstance.hasLayer(layer))
      window.mapInstance.removeLayer(layer);
  });

  // Tambahkan layer yang dipilih
  baseLayers[type].addTo(window.mapInstance);

  // Perbarui status visual pada Menu Switcher
  document
    .querySelectorAll(".basemap-option")
    .forEach((opt) => opt.classList.remove("active"));
  const activeOpt = document.getElementById("opt-" + type);
  if (activeOpt) activeOpt.classList.add("active");

  // Tutup menu otomatis setelah memilih (UI Logic)
  const menu = document.getElementById("basemapMenu");
  if (menu) menu.classList.remove("active");

  console.log(`Basemap diganti ke: ${type}`);
}

// 4. Konfigurasi Tool Menggambar Area of Interest (Leaflet.draw)
window.mapInstance.addLayer(window.drawnItems);

const drawControl = new L.Control.Draw({
  position: "topleft",
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true,
      shapeOptions: {
        color: "#00b8a9",
        fillOpacity: 0.15,
        weight: 3,
        dashArray: "5, 5",
      },
    },
    rectangle: {
      shapeOptions: {
        color: "#00b8a9",
        fillOpacity: 0.15,
        weight: 3,
      },
    },
    // Matikan fitur yang tidak relevan untuk analisis spasial USLE
    polyline: false,
    circle: false,
    marker: false,
    circlemarker: false,
  },
  edit: {
    featureGroup: window.drawnItems,
    remove: true,
  },
});
window.mapInstance.addControl(drawControl);

// 5. Event Handler saat AOI Selesai Digambar
window.mapInstance.on(L.Draw.Event.CREATED, function (e) {
  const layer = e.layer;

  // Bersihkan AOI sebelumnya (Hanya mengizinkan satu area analisis per sesi)
  window.drawnItems.clearLayers();
  window.drawnItems.addLayer(layer);

  // Simpan data GeoJSON untuk dikirim ke Backend Flask via api.js
  currentAOI = layer.toGeoJSON();
  console.log("📍 AOI Berhasil Ditetapkan:", currentAOI);

  // Update status UI di Sidebar
  updateAOIStatus(true);
});

// Event Handler saat AOI dihapus manual via tool edit
window.mapInstance.on(L.Draw.Event.DELETED, function () {
  currentAOI = null;
  updateAOIStatus(false);

  // Hapus juga layer GEE jika ada hasil sebelumnya
  if (window.geeLayer) {
    window.mapInstance.removeLayer(window.geeLayer);
  }
});

/**
 * Fungsi Pembantu untuk Update Status UI di Sidebar (Hint Box & Button)
 * @param {boolean} isActive
 */
function updateAOIStatus(isActive) {
  const btnProcess = document.getElementById("btnProcess");
  const hintBox = document.getElementById("aoiStatus");

  if (isActive) {
    btnProcess.disabled = false;
    hintBox.classList.add("active");
    hintBox.innerHTML = `
            <strong><i class="fa-solid fa-check-circle"></i> AOI Terpilih</strong><br>
            Area di Sub-DAS Tanralili siap dianalisis dengan model USLE.
        `;
  } else {
    btnProcess.disabled = true;
    hintBox.classList.remove("active");
    hintBox.innerHTML = `
            <strong><i class="fa-solid fa-draw-polygon"></i> 1. Area of Interest (AOI)</strong><br>
            Gunakan tool di peta untuk menentukan batas area analisis.
        `;
  }
}

/**
 * Export fungsi untuk diakses secara global oleh api.js
 */
window.getCurrentAOI = () => currentAOI;
