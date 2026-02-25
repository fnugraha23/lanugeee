/* ======================================================
   LONTARA — FORM HANDLER (EMAILJS INTEGRATION)
   Mengirim pesan otomatis di latar belakang
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi EmailJS dengan Public Key kamu
  emailjs.init("UYXE1DX3pWfcDCIU8");

  const contactForm = document.getElementById("contact-form");
  const gatedForm = document.getElementById("gated-access-form");

  // 2. Masukkan Service ID kamu
  const serviceID = "service_1gevel5";
  
  // 3. Masukkan Template ID kamu di sini (cari di Dashboard EmailJS -> Email Templates)
  const templateID = "template_n753lnf"; 

  /* 1. GENERAL CONTACT FORM HANDLER */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah halaman refresh

      // Feedback visual pada tombol saat loading
      const btn = contactForm.querySelector("button[type='submit']") || contactForm.querySelector("button");
      const originalText = btn ? btn.innerText : "Kirim Pesan";

      if (btn) {
        btn.innerText = "Mengirim...";
        btn.disabled = true;
      }

      // Mengirim data form via EmailJS
      // Parameter 'this' akan otomatis mengambil semua input yang memiliki atribut 'name' di HTML-mu
      emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            // Jika Berhasil
            alert("Sukses! Pesan Anda telah terkirim ke tim Lontara.");
            contactForm.reset();
            if (btn) {
              btn.innerText = originalText;
              btn.disabled = false;
            }
        }, function(error) {
            // Jika Gagal
            alert("Gagal mengirim pesan. Error: " + JSON.stringify(error));
            if (btn) {
              btn.innerText = originalText;
              btn.disabled = false;
            }
        });
    });
  }

  /* 2. GATED CONTENT HANDLER (Premium Downloads) */
  if (gatedForm) {
    gatedForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = gatedForm.querySelector("button[type='submit']") || gatedForm.querySelector("button");
      const originalText = btn ? btn.innerText : "Kirim Permintaan";
      
      if (btn) {
        btn.innerText = "Memproses...";
        btn.disabled = true;
      }

      // Mengirim data form premium via EmailJS
      // Catatan: Jika form premium ini butuh format email yang berbeda dari form kontak, 
      // kamu harus buat Template baru di EmailJS dan masukkan ID-nya di bawah ini.
      // Untuk sementara saya pakai templateID yang sama.
      emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            alert("Sukses! Permintaan akses toolkit Anda telah kami terima.");
            gatedForm.reset();
            if (btn) {
              btn.innerText = originalText;
              btn.disabled = false;
            }
        }, function(error) {
            alert("Terjadi kesalahan. Error: " + JSON.stringify(error));
            if (btn) {
              btn.innerText = originalText;
              btn.disabled = false;
            }
        });
    });
  }
});

