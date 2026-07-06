/**
 * ==========================================================================
 * LONTARA TECH — SPA ROUTING ENGINE (APP SHELL)
 * Lokasi: js/app-shell.js
 * ==========================================================================
 */

const AppShell = {
routeMap: {
    // --- HALAMAN UTAMA ---
    "beranda": { url: "sumber-konten/beranda.html", title: "Beranda | Lontara Tech" },
    "layanan": { url: "sumber-konten/layanan/layanan.html", title: "Layanan | Lontara Tech" },
    "portofolio": { url: "sumber-konten/portofolio/portofolio.html", title: "Portofolio | Lontara Tech" },
    "artikel": { url: "sumber-konten/artikel/artikel.html", title: "Artikel | Lontara Tech" },
    "publikasi": { url: "sumber-konten/publikasi/publikasi.html", title: "Publikasi | Lontara Tech" },
    "aset-digital": { url: "sumber-konten/aset-digital/aset-digital.html", title: "Aset Digital | Lontara Tech" },
    "tentang": { url: "sumber-konten/tentang/tentang.html", title: "Tentang Kami | Lontara Tech" },
    "kontak": { url: "sumber-konten/kontak/kontak.html", title: "Kontak | Lontara Tech" },
    
    // --- FITUR & AKUN ---
    "keranjang": { url: "sumber-konten/keranjang/keranjang.html", title: "Keranjang Belanja | Lontara Tech" },
    "profil": { url: "sumber-konten/profil/profil.html", title: "Profil Pengguna | Lontara Tech" },
    "login": { url: "sumber-konten/auth/login.html", title: "Masuk | Lontara Tech" },
    "register": { url: "sumber-konten/auth/register.html", title: "Daftar Akun | Lontara Tech" },

    // --- ARTIKEL ---
    "artikel/data-spasial": { url: "sumber-konten/artikel/data-spasial.html", title: "Data Spasial | Lontara Tech" },
    "artikel/gis-dasar": { url: "sumber-konten/artikel/gis-dasar.html", title: "GIS Dasar | Lontara Tech" },
    "artikel/proyeksi": { url: "sumber-konten/artikel/proyeksi.html", title: "Proyeksi | Lontara Tech" },
    "artikel/workflow": { url: "sumber-konten/artikel/workflow.html", title: "Workflow | Lontara Tech" },

    // --- PORTOFOLIO ---
    "portofolio/lereng": { url: "sumber-konten/portofolio/proyek-0-toolbox-lereng/toolbox-lereng.html", title: "Toolbox Lereng | Portofolio Lontara" },
    "portofolio/proyek-1": { url: "sumber-konten/portofolio/proyek-1-webgis/overview-proyek-1.html", title: "Proyek WebGIS | Portofolio Lontara" },
    "portofolio/proyek-2": { url: "sumber-konten/portofolio/proyek-2-wb-style/overview-proyek-2.html", title: "Proyek WB Style | Portofolio Lontara" },
    "portofolio/proyek-3": { url: "sumber-konten/portofolio/proyek-3-geengine/overview-proyek-3.html", title: "Proyek GE Engine | Portofolio Lontara" },
    "portofolio/proyek-4": { url: "sumber-konten/portofolio/proyek-4-usle/overview-proyek-4.html", title: "Proyek USLE | Portofolio Lontara" },
    "portofolio/proyek-5": { url: "sumber-konten/portofolio/proyek-5-toolkit/overview-proyek-5.html", title: "Proyek Toolkit | Portofolio Lontara" },

    // --- ASET DIGITAL ---
    "aset-digital/batas-admin-2024": { url: "sumber-konten/aset-digital/gratis/batas-admin-big-2024.html", title: "Batas Admin BIG 2024 | Aset Digital Lontara" },
    "aset-digital/tool-lereng": { url: "sumber-konten/aset-digital/premium/toolbox-lereng.html", title: "Toolbox Lereng | Aset Digital Lontara" },

    // =========================================================================
    // KATALOG PRODUK LONTARA TECH (52 Rute Baru)
    // =========================================================================

    // --- KATEGORI 1: WEBSITE SEDERHANA ---
    "layanan/sederhana-travel": { url: "sumber-konten/layanan/sederhana-travel.html", title: "Website Sederhana Travel | Lontara Tech" },
    "layanan/sederhana-apotek": { url: "sumber-konten/layanan/sederhana-apotek.html", title: "Website Sederhana Apotek | Lontara Tech" },
    "layanan/sederhana-komputer": { url: "sumber-konten/layanan/sederhana-komputer.html", title: "Website Sederhana Komputer | Lontara Tech" },
    "layanan/sederhana-sekolah": { url: "sumber-konten/layanan/sederhana-sekolah.html", title: "Website Sederhana Sekolah | Lontara Tech" },
    "layanan/sederhana-organisasi": { url: "sumber-konten/layanan/sederhana-organisasi.html", title: "Website Sederhana Organisasi | Lontara Tech" },
    "layanan/sederhana-portofolio": { url: "sumber-konten/layanan/sederhana-portofolio.html", title: "Website Sederhana Portofolio | Lontara Tech" },
    "layanan/sederhana-pertanian": { url: "sumber-konten/layanan/sederhana-pertanian.html", title: "Website Sederhana Pertanian | Lontara Tech" },
    "layanan/sederhana-konsultan": { url: "sumber-konten/layanan/sederhana-konsultan.html", title: "Website Sederhana Konsultan | Lontara Tech" },
    "layanan/sederhana-portal-daerah": { url: "sumber-konten/layanan/sederhana-portal-daerah.html", title: "Website Sederhana Portal Daerah | Lontara Tech" },
    "layanan/sederhana-elearning": { url: "sumber-konten/layanan/sederhana-elearning.html", title: "Website Sederhana E-Learning | Lontara Tech" },
    "layanan/sederhana-properti": { url: "sumber-konten/layanan/sederhana-properti.html", title: "Website Sederhana Properti | Lontara Tech" },
    "layanan/sederhana-restoran": { url: "sumber-konten/layanan/sederhana-restoran.html", title: "Website Sederhana Restoran | Lontara Tech" },

    // --- KATEGORI 2: SYSTEM POS ---
    "layanan/pos-bangunan": { url: "sumber-konten/layanan/pos-bangunan.html", title: "Kasir POS Bangunan | Lontara Tech" },
    "layanan/pos-fnb": { url: "sumber-konten/layanan/pos-fnb.html", title: "Kasir POS F&B | Lontara Tech" },
    "layanan/pos-komputer": { url: "sumber-konten/layanan/pos-komputer.html", title: "Kasir POS Komputer | Lontara Tech" },
    "layanan/pos-minimarket": { url: "sumber-konten/layanan/pos-minimarket.html", title: "Kasir POS Minimarket | Lontara Tech" },
    "layanan/pos-restoran": { url: "sumber-konten/layanan/pos-restoran.html", title: "Kasir POS Restoran | Lontara Tech" },
    "layanan/pos-sembako": { url: "sumber-konten/layanan/pos-sembako.html", title: "Kasir POS Sembako | Lontara Tech" },
    "layanan/pos-apotek": { url: "sumber-konten/layanan/pos-apotek.html", title: "Kasir POS Apotek | Lontara Tech" },
    "layanan/pos-pertanian": { url: "sumber-konten/layanan/pos-pertanian.html", title: "Kasir POS Pertanian | Lontara Tech" },

    // --- KATEGORI 3: WEBGIS ---
    "layanan/webgis-classic": { url: "sumber-konten/layanan/webgis-classic.html", title: "Classic WebGIS | Lontara Tech" },
    "layanan/webgis-landing-map": { url: "sumber-konten/layanan/webgis-landing-map.html", title: "Landing to Map WebGIS | Lontara Tech" },
    "layanan/webgis-split-screen": { url: "sumber-konten/layanan/webgis-split-screen.html", title: "Split-Screen WebGIS | Lontara Tech" },
    "layanan/webgis-topnav": { url: "sumber-konten/layanan/webgis-topnav.html", title: "Top-Nav WebGIS | Lontara Tech" },
    "layanan/webgis-storymap": { url: "sumber-konten/layanan/webgis-storymap.html", title: "Story Map WebGIS | Lontara Tech" },
    "layanan/webgis-bottom-console": { url: "sumber-konten/layanan/webgis-bottom-console.html", title: "Bottom Console WebGIS | Lontara Tech" },
    "layanan/webgis-iot-monitoring": { url: "sumber-konten/layanan/webgis-iot-monitoring.html", title: "IoT Monitoring WebGIS | Lontara Tech" },
    "layanan/webgis-iot-relay": { url: "sumber-konten/layanan/webgis-iot-relay.html", title: "IoT Relay WebGIS | Lontara Tech" },

    // --- KATEGORI 4: INTERMEDIETE ---
    "layanan/intermediete-iot": { url: "sumber-konten/layanan/intermediete-iot.html", title: "Intermediete IoT | Lontara Tech" },
    "layanan/intermediete-spektral": { url: "sumber-konten/layanan/intermediete-spektral.html", title: "Intermediete Spektral | Lontara Tech" },
    "layanan/intermediete-pertanian": { url: "sumber-konten/layanan/intermediete-pertanian.html", title: "Intermediete Pertanian | Lontara Tech" },
    "layanan/intermediete-bento": { url: "sumber-konten/layanan/intermediete-bento.html", title: "Intermediete Bento OS | Lontara Tech" },

    // --- KATEGORI 5: EXCLUSIVE ---
    "layanan/exclusive-lumina": { url: "sumber-konten/layanan/exclusive-lumina.html", title: "3D Lumina Glass | Lontara Tech" },
    "layanan/exclusive-obsidian": { url: "sumber-konten/layanan/exclusive-obsidian.html", title: "3D Obsidian Solid | Lontara Tech" },
    "layanan/exclusive-kinetix": { url: "sumber-konten/layanan/exclusive-kinetix.html", title: "3D Kinetix Flow | Lontara Tech" },
    "layanan/exclusive-aura": { url: "sumber-konten/layanan/exclusive-aura.html", title: "3D Aura Chrome | Lontara Tech" },
    "layanan/exclusive-softscape": { url: "sumber-konten/layanan/exclusive-softscape.html", title: "3D SoftScape Clay | Lontara Tech" },
    "layanan/exclusive-terraform": { url: "sumber-konten/layanan/exclusive-terraform.html", title: "3D TerraForm Organic | Lontara Tech" },
    "layanan/exclusive-holovista": { url: "sumber-konten/layanan/exclusive-holovista.html", title: "3D HoloVista | Lontara Tech" },
    "layanan/exclusive-aureate": { url: "sumber-konten/layanan/exclusive-aureate.html", title: "3D Aureate Prestige | Lontara Tech" },
    "layanan/exclusive-fluidity": { url: "sumber-konten/layanan/exclusive-fluidity.html", title: "3D Fluidity Abstract | Lontara Tech" },
    "layanan/exclusive-neoblock": { url: "sumber-konten/layanan/exclusive-neoblock.html", title: "3D Neo-Block | Lontara Tech" },
    "layanan/exclusive-mushroom": { url: "sumber-konten/layanan/exclusive-mushroom.html", title: "Animasi Mushroom Kingdom | Lontara Tech" },
    "layanan/exclusive-supersonic": { url: "sumber-konten/layanan/exclusive-supersonic.html", title: "Animasi Supersonic Dash | Lontara Tech" },
    "layanan/exclusive-pixel": { url: "sumber-konten/layanan/exclusive-pixel.html", title: "Animasi Pixel Craft | Lontara Tech" },
    "layanan/exclusive-heroic": { url: "sumber-konten/layanan/exclusive-heroic.html", title: "Animasi Heroic Assemble | Lontara Tech" },
    "layanan/exclusive-webslinger": { url: "sumber-konten/layanan/exclusive-webslinger.html", title: "Animasi Web Slinger | Lontara Tech" },
    "layanan/exclusive-pocket": { url: "sumber-konten/layanan/exclusive-pocket.html", title: "Animasi Pocket Trainer | Lontara Tech" },
    "layanan/exclusive-hidden": { url: "sumber-konten/layanan/exclusive-hidden.html", title: "Animasi Hidden Village | Lontara Tech" },
    "layanan/exclusive-dragon": { url: "sumber-konten/layanan/exclusive-dragon.html", title: "Animasi Dragon Aura | Lontara Tech" },
    "layanan/exclusive-hero": { url: "sumber-konten/layanan/exclusive-hero.html", title: "Animasi Hero of Time | Lontara Tech" },
    "layanan/exclusive-magic": { url: "sumber-konten/layanan/exclusive-magic.html", title: "Animasi Magic Castle | Lontara Tech" }
  }, // PENTING: Jangan hapus koma penutup ini dan pastikan blok 'init()' berada tepat di bawahnya.

  init() {
    console.log("Lontara SPA Engine: Berjalan Tanpa Hambatan...");

    this.contentArea = document.getElementById("render-konten");
    this.progressBar = document.getElementById("progress-bar");

    // 1. Intersep Klik pada Tautan Routing Saja (.nav-link-ajax)
    document.body.addEventListener("click", (e) => {
      const link = e.target.closest(".nav-link-ajax");
      
      // Jika itu adalah link routing (pindah halaman HTML)
      if (link) {
        e.preventDefault(); 
        const href = link.getAttribute("href");
        const alias = href.startsWith("#") ? href.substring(1) : href;
        this.navigateTo(alias);
      }
      
      // PERBAIKAN: Tangani link scroll-to-id (Smooth Scroll)
      const scrollLink = e.target.closest("a[href^='#']:not(.nav-link-ajax)");
      if (scrollLink) {
        e.preventDefault();
        const targetId = scrollLink.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Scroll halus ke elemen yang dituju
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Memperbarui URL tanpa memicu 'hashchange' agar halaman tidak termuat ulang
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });

    // 2. Pantau Perubahan URL
    window.addEventListener("hashchange", () => {
      this.loadContentFromHash();
    });

    // 3. Muat halaman pertama kali
    this.loadContentFromHash();
  },

  navigateTo(alias) {
    window.location.hash = alias;
  },

  async loadContentFromHash() {
    let alias = window.location.hash.substring(1);
    
    // Default ke Beranda jika kosong
    if (!alias || alias === "" || alias === "/") {
      alias = "beranda";
    }

    // PERBAIKAN PENTING: Cegah routing ulang jika yang diklik adalah anchor ID di halaman yang sedang aktif
    // Misalnya user sedang di '#layanan', lalu klik href='#features' (menjadi '#features' di URL)
    // Jika 'features' tidak ada di routeMap, kita cek apakah elemen id="features" ada di halaman saat ini.
    // Jika ada, batalkan proses fetch file HTML (karena tidak perlu).
    const isAnchorInPage = document.getElementById(alias);
    if (isAnchorInPage && !this.routeMap[alias]) {
      isAnchorInPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return; // Berhenti di sini, jangan lakukan fetch
    }

    const route = this.routeMap[alias];

    if (!route) {
      this.renderErrorPage(alias);
      return;
    }

    document.title = route.title;
    
    // Simpan route aktif terakhir agar kita tahu halaman utamanya apa
    this.currentMainRoute = alias;
    
    this.fetchAndRender(route.url, alias);
  },

  async fetchAndRender(url, alias) {
    if (this.progressBar) {
      this.progressBar.style.opacity = "1";
      this.progressBar.style.width = "30%";
    }

    try {
      const response = await fetch(url);
      if (this.progressBar) this.progressBar.style.width = "60%";

      if (!response.ok) {
        throw new Error(`File tidak ditemukan: ${response.status}`);
      }

      const htmlContent = await response.text();
      if (this.progressBar) this.progressBar.style.width = "90%";

      this.contentArea.innerHTML = htmlContent;
      this.onContentLoaded(alias);
    } catch (error) {
      console.error("Lontara SPA Error:", error);
      this.renderErrorPage(alias);
    } finally {
      if (this.progressBar) {
        this.progressBar.style.width = "100%";
        setTimeout(() => {
          this.progressBar.style.opacity = "0";
          setTimeout(() => {
            this.progressBar.style.width = "0%";
          }, 300);
        }, 500);
      }
    }
  },

  renderErrorPage(alias) {
    this.contentArea.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 2rem;">
          <i class="fa-solid fa-satellite-dish" style="font-size: 5rem; color: var(--accent); margin-bottom: 1.5rem;"></i>
          <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-main);">Radar Kehilangan Sinyal</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 500px;">
              Koordinat <strong>"${alias}"</strong> tidak ditemukan dalam database rute Lontara.
          </p>
          <a href="#beranda" class="nav-link-ajax btn-primary">
              Kembali ke Pusat Komando
          </a>
      </div>
    `;
  },

  onContentLoaded(alias) {
    window.scrollTo({ top: 0, behavior: "instant" });

    if (window.LontaraUI && typeof window.LontaraUI.updateActiveLinks === "function") {
      window.LontaraUI.updateActiveLinks(alias);
    }

    if (typeof window.reinitAnimations === "function") {
      window.reinitAnimations();
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  AppShell.init();
});
