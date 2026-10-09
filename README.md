# Portfolio — Muhammad Faturrahman Syakib

Website statis (HTML, CSS, JavaScript vanilla). Tanpa build, tanpa backend.

## Menjalankan
Klik dua kali `index.html`, atau di VS Code gunakan ekstensi Live Server. Koneksi internet dibutuhkan untuk font Google dan ikon Devicon.

## Mengisi email & tautan sosial
Buka `js/script.js`, isi objek `CONFIG` (email, github, linkedin, instagram). Yang dikosongkan tampil sebagai "belum diisi" dan tidak bisa diklik. Formulir kontak memakai `mailto:`, jadi baru berfungsi setelah `CONFIG.email` diisi.

## Mengganti foto profil
Letakkan foto di `assets/images/foto.jpg`. Di `index.html`, tambahkan di dalam `.hero-copy` atau `.panel` About:
`<img src="assets/images/foto.jpg" alt="Foto Muhammad Faturrahman Syakib" width="320" height="320" loading="lazy">`
Kompres gambar (< 200 KB) agar tetap cepat.

## Mengubah pengalaman
Edit blok `<li class="tl reveal">` di section `#experience` pada `index.html`. Salin satu blok untuk menambah entri; tambahkan class `featured` untuk menonjolkan.

## Menambah proyek
Tambahkan objek baru ke array `PROJECTS` di `js/script.js`:
`{ title, cat:"web|software|data", catLabel, status:"Completed|In Progress|Concept", mock:"web|ai|data", desc, tech:[], demo:"URL", source:"URL" }`
Pastikan `status` sesuai kondisi sebenarnya. Isi `demo` dan `source` dengan URL asli.

## Mengubah skill
Edit objek `SKILLS` di `js/script.js`. Ikon memakai nama class Devicon (devicon.dev); tanpa ikon akan tampil monogram.

## Mengubah warna & tema
Ubah variabel di bagian `:root` pada `css/style.css` (`--red`, `--red-d`, `--maroon`, `--bg`, dst.).

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub, unggah seluruh isi folder `portfolio/` (`index.html` harus di root repo).
2. Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/ (root)` → Save.
3. Situs aktif di `https://username.github.io/nama-repo/`.
