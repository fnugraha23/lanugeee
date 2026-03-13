/* ======================================================
   LONTARA — SEARCH LOGIC ENGINE
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const resultsContainer = document.getElementById("results-list");
  const queryDisplay = document.getElementById("query-display");

  // Jika elemen hasil pencarian tidak ada di halaman ini, hentikan script
  if (!resultsContainer) return;

  // 1. Ambil parameter '?q=' dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const rawQuery = urlParams.get("q");

  if (!rawQuery) {
    queryDisplay.textContent = "Kosong";
    resultsContainer.innerHTML = `<div class="no-results">Silakan masukkan kata kunci pada kolom pencarian di menu atas.</div>`;
    return;
  }

  const query = rawQuery.trim().toLowerCase();
  queryDisplay.textContent = `"${rawQuery}"`;

  // Isi otomatis input pencarian di navbar dengan kata yang dicari
  const searchInputs = document.querySelectorAll('input[name="q"]');
  searchInputs.forEach((input) => (input.value = rawQuery));

  // 2. Ambil data JSON (Perhatikan penggunaan ../)
  fetch("../search-data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Gagal memuat data pencarian.");
      return response.json();
    })
    .then((data) => {
      // 3. Filter data berdasarkan judul, deskripsi, kategori, atau keyword
      const filteredResults = data.filter((item) => {
        const titleMatch = item.judul.toLowerCase().includes(query);
        const descMatch = item.deskripsi.toLowerCase().includes(query);
        const catMatch = item.kategori.toLowerCase().includes(query);
        const keyMatch = item.keyword
          ? item.keyword.toLowerCase().includes(query)
          : false;

        return titleMatch || descMatch || catMatch || keyMatch;
      });

      // 4. Render Hasil ke HTML
      renderResults(filteredResults);
    })
    .catch((error) => {
      console.error(error);
      resultsContainer.innerHTML = `<div class="no-results" style="color: #991b1b;">Terjadi kesalahan sistem saat memuat modul pencarian.</div>`;
    });

  function renderResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results reveal-init">
          <svg style="margin: 0 auto 15px; color: var(--border);" viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>Tidak ada hasil yang sesuai</h3>
          <p>Maaf, kami tidak menemukan layanan atau artikel untuk <strong>"${rawQuery}"</strong>. Coba kata kunci lain seperti "python", "lahan", atau "webgis".</p>
          <a href="../beranda.html" class="btn-secondary" style="margin-top: 20px;">Kembali ke Beranda</a>
        </div>
      `;
      // Paksa animasi muncul untuk state kosong
      setTimeout(() => {
        const noRes = resultsContainer.querySelector(".reveal-init");
        if (noRes) noRes.classList.add("reveal-active");
      }, 50);
      return;
    }

    let htmlOutput = "";

    results.forEach((item) => {
      let badgeClass = "badge-layanan";
      if (item.kategori.toLowerCase() === "portofolio")
        badgeClass = "badge-portofolio";
      if (item.kategori.toLowerCase() === "artikel")
        badgeClass = "badge-artikel";
      if (item.kategori.toLowerCase() === "aset digital")
        badgeClass = "badge-aset";

      htmlOutput += `
        <article class="result-card reveal-init">
          <div class="result-meta">
            <span class="badge ${badgeClass}">${item.kategori}</span>
          </div>
          <h2 class="result-title">
            <a href="..${item.url}">${item.judul}</a>
          </h2>
          <p class="result-desc">${item.deskripsi}</p>
        </article>
      `;
    });

    resultsContainer.innerHTML = htmlOutput;

    // Aktifkan observer animasi dari Lontara untuk efek muncul perlahan
    setTimeout(() => {
      const newCards = resultsContainer.querySelectorAll(".reveal-init");
      newCards.forEach((card) => card.classList.add("reveal-active"));
    }, 50);
  }
});
