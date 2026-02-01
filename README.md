# 🎉 Website Ulang Tahun Romantis

Website ulang tahun yang indah dan romantis dengan tema biru, hitam, dan putih. Responsif untuk mobile dan desktop, dilengkapi dengan musik romantis dan galeri foto.

## ✨ Fitur

- 🎨 Desain modern dengan tema biru, hitam, dan putih
- 📱 Responsif untuk mobile dan desktop
- 🎵 Music player dengan lagu romantis
- 📸 Galeri foto dengan modal popup
- ❤️ Animasi hati dan efek visual yang menarik
- ⭐ Background animasi bintang
- 💫 Efek confetti saat halaman dimuat

## 🚀 Cara Menggunakan

### 1. Menambahkan Foto

Buka file `script.js` dan edit array `photos`:

```javascript
const photos = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    // Tambahkan lebih banyak foto di sini
];
```

**Opsi untuk foto:**
- Buat folder `images/` dan letakkan foto-foto kalian di sana
- Atau gunakan URL dari internet (pastikan URL bisa diakses publik)

### 2. Mengganti Musik

Edit bagian audio di `index.html`:

```html
<audio id="audioPlayer" loop>
    <source src="URL_LAGU_ANDA.mp3" type="audio/mpeg">
    Browser Anda tidak mendukung audio.
</audio>
```

**Opsi untuk musik:**
- Upload file MP3 ke folder proyek dan ganti URL
- Atau gunakan URL dari internet (pastikan URL bisa diakses publik)

## 📦 Cara Hosting di GitHub Pages

1. **Buat Repository di GitHub**
   - Buka GitHub dan buat repository baru
   - Nama repository bisa apa saja (contoh: `birthday-website`)

2. **Upload File ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**
   - Buka repository di GitHub
   - Klik **Settings** → **Pages**
   - Di bagian **Source**, pilih **main branch**
   - Klik **Save**
   - Tunggu beberapa menit, website akan tersedia di:
     `https://USERNAME.github.io/REPOSITORY-NAME/`

## 📁 Struktur File

```
birthday-website/
│
├── index.html          # File HTML utama
├── style.css           # File CSS untuk styling
├── script.js           # File JavaScript untuk interaktivitas
├── README.md           # Dokumentasi
└── images/             # Folder untuk foto-foto (buat sendiri)
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

## 🎨 Kustomisasi

### Mengubah Warna
Edit file `style.css` dan cari variabel warna:
- Biru: `#4a90e2` dan `#357abd`
- Hitam: `#0a0a0a`, `#1a1a2e`, `#16213e`
- Putih: `#ffffff`

### Mengubah Teks
Edit file `index.html` untuk mengubah pesan ulang tahun dan teks lainnya.

## 📱 Browser Support

Website ini bekerja di semua browser modern:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## 💡 Tips

- Gunakan foto dengan resolusi yang baik untuk hasil terbaik
- Kompres foto jika ukurannya terlalu besar untuk loading yang lebih cepat
- Pastikan file musik tidak terlalu besar (max 5MB disarankan)
- Test website di berbagai ukuran layar sebelum dibagikan

## 📄 Lisensi

Website ini dibuat dengan penuh cinta untuk pacar tercinta ❤️

---

**Selamat Ulang Tahun! 🎂🎉**
