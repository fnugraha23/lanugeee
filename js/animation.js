/* ======================================================
   LONTARA — ANIMATIONS
   Scroll effects, Reveals, & Header transitions
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* 1. HEADER SHRINK ON SCROLL */
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  /* 2. SCROLL PROGRESS BAR */
  const progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  }

  /* 3. SCROLL REVEAL (Intersection Observer) - GLOBAL FIX */
  // Menambahkan .reveal-init agar JS pintar mendeteksi semua elemen baru di halaman mana pun
  const revealElements = document.querySelectorAll(
    ".section, .card, .hero-content, .reveal-init",
  );

  const revealOptions = {
    threshold: 0.15, // Muncul ketika 15% elemen terlihat
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        // Opsional: observer.unobserve(entry.target); // Hapus komen jika ingin animasi hanya 1x
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    // Pastikan elemen mendapatkan class inisiasi (transparan) sebelum diobservasi
    if (!el.classList.contains("reveal-init")) {
      el.classList.add("reveal-init");
    }
    observer.observe(el);
  });
});
