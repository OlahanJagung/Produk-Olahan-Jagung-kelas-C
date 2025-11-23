/**
 * Fungsi untuk menerapkan kode voucher "CornGroupOne".
 * Menerapkan diskon acak 10-20% ke harga semua produk.
 */
function applyVoucher() {
  const code = document.getElementById("voucher").value.trim();
  const products = document.querySelectorAll(".product-card");

  if (code === "CornGroupOne") {
    products.forEach(card => {
      // Ambil harga asli (asumsi data-price adalah harga setelah diskon pertama di HTML)
      // Untuk logika yang benar, kita harus menyimpan harga dasar, namun kita gunakan data-price sebagai base.
      let originalPrice = parseInt(card.getAttribute("data-price")); 
      
      // diskon acak 10-20%
      let discountPercent = Math.floor(Math.random() * (20 - 10 + 1)) + 10; 
      let newPrice = originalPrice - (originalPrice * discountPercent / 100);

      // Update tampilan harga (price-discount)
      let priceElement = card.querySelector(".price-discount");
      priceElement.textContent = "Rp " + Math.round(newPrice).toLocaleString("id-ID"); // Bulatkan harga

      // Tambahkan info diskon
      let info = card.querySelector(".voucher-info");
      if (!info) {
        info = document.createElement("p");
        info.className = "voucher-info";
        info.style.color = "#28a745";
        info.style.fontSize = "13px";
        card.appendChild(info);
      }
      info.textContent = `Diskon ${discountPercent}% dengan kode voucher!`;
    });

    alert("Kode voucher berhasil diterapkan 🎉");
  } else {
    alert("Kode voucher tidak valid ❌");
  }
}


/**
 * Fungsi untuk memutar roda 'Lucky Spin'.
 * Menerapkan hasil putaran (diskon atau gratis ongkir) ke produk.
 */
function spinWheel() {
  const wheel = document.getElementById("wheel");
  const result = document.getElementById("result");

  // Daftar hadiah
  const prizes = ["Diskon 15%", "Gratis Ongkir", "Zonk 😅", "Diskon 20%", "Diskon 10%"];
  
  // Putar acak (minimal 2 putaran + posisi hasil)
  const randomDegree = Math.floor(Math.random() * 360) + 720; 
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  // Reset hasil
  result.textContent = "Berputar...";

  // Tentukan hasil setelah animasi selesai (4 detik)
  setTimeout(() => {
    const index = Math.floor(Math.random() * prizes.length);
    const prize = prizes[index];
    result.textContent = "Kamu dapat: " + prize;

    // Efek ke produk
    if (prize.includes("Diskon")) {
      const discount = parseInt(prize.replace(/\D/g,'')); // ambil angka diskon
      const products = document.querySelectorAll(".product-card");
      
      products.forEach(card => {
        let originalPrice = parseInt(card.getAttribute("data-price"));
        let newPrice = originalPrice - (originalPrice * discount / 100);
        
        // Update tampilan harga diskon
        card.querySelector(".price-discount").textContent = "Rp " + Math.round(newPrice).toLocaleString("id-ID");
        
        // Update/tambahkan info voucher jika ada
        let info = card.querySelector(".voucher-info");
        if (!info) {
          info = document.createElement("p");
          info.className = "voucher-info";
          info.style.color = "#28a745";
          info.style.fontSize = "13px";
          card.appendChild(info);
        }
        info.textContent = `Diskon ${discount}% dari Lucky Spin diterapkan!`;
      });
      alert(`Selamat! Diskon ${discount}% berhasil diterapkan ke semua produk 🎉`);

    } else if (prize === "Gratis Ongkir") {
      alert("Selamat! Ongkir gratis akan diterapkan saat checkout 🚚");
    } else if (prize === "Zonk 😅") {
      alert("Yah, coba lagi lain waktu! Tetap semangat! 😉");
    }
  }, 4000); // sesuai durasi animasi
}

// Catatan: Fungsionalitas Keranjang (cart-btn, cart-popup) belum ada di kode JS asli, 
// jadi tidak ditambahkan di sini untuk menghindari error.
// Fungsionalitas "Beli" juga langsung mengarah ke Instagram, bukan menambahkan ke keranjang.