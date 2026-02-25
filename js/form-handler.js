/* ======================================================
   LONTARA — GLOBAL FORM HANDLER (EMAILJS)
   Mendukung Form Kontak & Premium Toolkit
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi Kredensial EmailJS Lontara
  // Menggunakan Public Key resmi Anda
  emailjs.init("UYXE1DX3pWfcDCIU8");

  const serviceID = "service_1gevel5";
  const templateID = "template_n753lnf";

  /**
   * Fungsi Helper untuk Menangani Pengiriman Form
   * @param {string} formId - ID elemen form di HTML
   * @param {string} successMessage - Pesan yang muncul saat berhasil
   */
  const setupFormHandler = (formId, successMessage) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      const originalText = btn ? btn.innerText : "Kirim";

      // Memberikan feedback visual (Loading state)
      if (btn) {
        btn.innerText = "Sedang Memproses...";
        btn.disabled = true;
      }

      // Mengirim data menggunakan ID selector untuk akurasi parameter 100%
      emailjs.sendForm(serviceID, templateID, `#${formId}`)
        .then(() => {
          alert(successMessage);
          form.reset();
        })
        .catch((error) => {
          alert("Terjadi kesalahan teknis: " + JSON.stringify(error));
        })
        .finally(() => {
          // Mengembalikan tombol ke kondisi semula
          if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
          }
        });
    });
  };

  // 2. Daftarkan Form yang Tersedia di Website
  // Handler untuk Form Kontak Utama
  setupFormHandler("contact-form", "Sukses! Pesan Anda telah terkirim ke tim Lontara.");

  // Handler untuk Form Akses Toolkit Premium
  setupFormHandler("gated-access-form", "Sukses! Permintaan akses toolkit Anda telah kami terima.");
});
