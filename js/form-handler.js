/* ======================================================
   LONTARA — FORM HANDLER (REAL MAILTO LOGIC)
   Membuka Draft Gmail Secara Otomatis
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const gatedForm = document.getElementById("gated-access-form");

  /* 1. GENERAL CONTACT FORM HANDLER */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Mengambil data dari input sesuai ID di HTML
      const name = document.getElementById("name").value;
      const userEmail = document.getElementById("email").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      // Menyusun Subjek dan Isi Email
      const subject = encodeURIComponent(`Tanya Lontara: ${service} - ${name}`);
      const body = encodeURIComponent(
        `Halo Tim Lontara,\n\n` +
          `Saya ${name} (${userEmail}), ingin berkonsultasi mengenai layanan ${service}.\n\n` +
          `Detail Kebutuhan:\n${message}\n\n` +
          `--- Terkirim melalui Form Kontak Lontara ---`,
      );

      // Membuka jendela email (mailto)
      const mailtoLink = `mailto:lontaraai@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, "_blank");

      // Feedback visual pada tombol
      const btn = contactForm.querySelector("button[type='submit']");
      const originalText = btn.innerText;

      btn.innerText = "Membuka Gmail...";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerText = "Draf Terbuka!";
        contactForm.reset();

        setTimeout(() => {
          btn.innerText = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  /* 2. GATED CONTENT HANDLER (Premium Downloads) */
  if (gatedForm) {
    gatedForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Mengambil data dari form premium
      const name = document.getElementById("premium-name").value;
      const userEmail = document.getElementById("premium-email").value;
      const toolkit = document.getElementById("toolkit-selection").value;

      const subject = encodeURIComponent(
        `Permintaan Akses Toolkit: ${toolkit}`,
      );
      const body = encodeURIComponent(
        `Halo Tim Lontara,\n\n` +
          `Saya ${name} bermaksud meminta akses untuk resource premium berikut:\n` +
          `Resource: ${toolkit}\n\n` +
          `Mohon informasikan langkah selanjutnya untuk mendapatkan akses tersebut.\n\n` +
          `Terima kasih.\n` +
          `Email Pengirim: ${userEmail}`,
      );

      // Membuka jendela email
      const mailtoLink = `mailto:lontaraai@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, "_blank");

      alert(
        "Draf email permintaan akses telah dibuat. Silakan klik 'Kirim' pada jendela email Anda.",
      );
      gatedForm.reset();
    });
  }
});
