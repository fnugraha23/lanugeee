/* ======================================================
    LONTARA — MAIN CORE
    Navigation Logic, Global Orchestration & Reveal Animations
   ====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
      1. MOBILE NAVIGATION SYSTEM
  =============================== */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const header = document.getElementById("header");

  // Create Overlay secara dinamis
  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  document.body.appendChild(overlay);

  if (navToggle && navMenu) {
    // Toggle Menu
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("show");
      overlay.classList.toggle("active");
    });

    // Close on Overlay Click
    overlay.addEventListener("click", () => {
      closeMobileMenu();
    });

    // Close on Link Click (penting untuk mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("nav-link-dropdown")) {
          closeMobileMenu();
        }
      });
    });
  }

  function closeMobileMenu() {
    if (navToggle) navToggle.classList.remove("active");
    if (navMenu) navMenu.classList.remove("show");
    overlay.classList.remove("active");
  }

  /* ===============================
      2. MOBILE DROPDOWN ACCORDION
  =============================== */
  const dropdownLinks = document.querySelectorAll(".has-dropdown > a");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;

        // Close other open dropdowns (Optional accordion effect)
        document.querySelectorAll(".has-dropdown").forEach((item) => {
          if (item !== parent) item.classList.remove("active");
        });

        parent.classList.toggle("active");
      }
    });
  });

  /* ===============================
      3. DETEKSI HALAMAN AKTIF
  =============================== */
  const navLinksList = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname;

  navLinksList.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (!linkPath || linkPath.startsWith("#")) return;

    // Normalisasi: Ambil nama file saja (misal: index.html)
    const fileName = linkPath.split("/").pop();
    const currentFileName = currentPath.split("/").pop();

    if (
      currentFileName === fileName ||
      (currentPath === "/" && (fileName === "index.html" || fileName === ""))
    ) {
      link.classList.add("active");
    }
  });

  /* ===============================
      4. STICKY HEADER SCROLL
  ============================== */
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  /* ===============================
      5. GLOBAL REVEAL ORCHESTRATOR
  =============================== */
  const revealElements = document.querySelectorAll(
    ".section, .card, .hero-content, .reveal-init, .webgis-container, .founder-image-container",
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    if (!el.classList.contains("reveal-init")) {
      el.classList.add("reveal-init");
    }
    revealObserver.observe(el);
  });
});
