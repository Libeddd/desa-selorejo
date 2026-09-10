<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_Kabupaten_Magetan.png" alt="Logo Kabupaten Magetan" width="100"/>
  <h1>🌿 Sistem Informasi & Website Desa Selorejo</h1>
  <p><strong>Platform Digital Terintegrasi untuk Profil Desa, Layanan Informasi, dan Direktori UMKM Lokal.</strong><br>
  <i>Dipersembahkan oleh Mahasiswa KKN-T PSDKU Magetan, Universitas Negeri Surabaya (UNESA)</i></p>
</div>

---

## 📖 Tentang Proyek
Website ini dibangun sebagai solusi digitalisasi administrasi dan promosi potensi **Desa Selorejo, Kecamatan Kawedanan, Kabupaten Magetan**. Fokus utama sistem ini adalah untuk menyediakan akses informasi yang transparan bagi masyarakat serta membantu para pelaku UMKM lokal untuk memperluas jangkauan pasar secara digital.

### ✨ Fitur Utama
- **🌍 Profil & Informasi Desa:** Sejarah, visi-misi, peta wilayah, dan data statistik demografi penduduk.
- **📰 Kabar Desa (Portal Berita):** Sistem manajemen artikel dan pengumuman desa yang terintegrasi (dilengkapi fitur upload gambar dan draft status).
- **🏪 Direktori UMKM:** Katalog digital untuk produk-produk unggulan dan UMKM masyarakat Desa Selorejo, lengkap dengan tombol langsung hubungi via WhatsApp.
- **👥 Perangkat Desa:** Menampilkan struktur organisasi dan data perangkat desa yang sedang menjabat.
- **✉️ Layanan Kontak Pintar:** Form aduan dan pesan yang langsung terhubung otomatis ke WhatsApp Admin / Google Spreadsheet.
- **🔐 Panel Admin Aman:** Dashboard khusus Kepala Desa / Admin yang dilindungi sistem autentikasi *(Role Level Security)*, untuk mengelola semua data secara *real-time* (CRUD).

---

## 🛠️ Teknologi yang Digunakan
Sistem ini menggunakan arsitektur modern berbasis **BaaS (Backend as a Service)** untuk menjamin kecepatan, keamanan, dan skalabilitas.

| Layer | Teknologi / Framework |
|-------|-----------|
| **Frontend** | [Next.js 15](https://nextjs.org/) (React, App Router, TypeScript) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & CSS Modules |
| **Database & API** | [Supabase](https://supabase.com/) (PostgreSQL + Auto REST API) |
| **Autentikasi** | Supabase Auth (Email / Password) |
| **Penyimpanan** | Supabase Storage (Untuk foto berita, UMKM, dan perangkat) |
| **Deployment** | [Vercel](https://vercel.com/) |

*(Catatan: Proyek ini tidak lagi menggunakan backend terpisah seperti Laravel, karena seluruh manajemen database dan API telah ditangani secara efisien oleh Supabase SDK di sisi klien dan server Next.js).*

---

## 🚀 Cara Menjalankan secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/Libeddd/desa-selorejo.git
   cd desa-selorejo/frontend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Atur Environment Variables:**
   Buat file `.env.local` di root folder `frontend` dan isi dengan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   NEXT_PUBLIC_WEBHOOK_URL=<your-google-apps-script-url>
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat website. Halaman admin tersedia di `/admin/login`.

---

## 📂 Struktur Folder Utama
```text
frontend/
├── src/
│   ├── app/                 # Halaman utama (App Router)
│   │   ├── admin/           # Dashboard & Sistem CRUD Admin
│   │   ├── berita/          # Daftar & detail Berita
│   │   ├── umkm/            # Direktori UMKM
│   │   └── ...
│   ├── components/          # Komponen UI (Navbar, Footer, Toast, dll)
│   ├── lib/                 # Konfigurasi Supabase & Fungsi Database
│   └── types/               # TypeScript interfaces
├── public/                  # Aset gambar statis
└── next.config.ts           # Konfigurasi Next.js
```

---

## 👥 Tim Pengembang
Proyek ini dikembangkan oleh Tim Mahasiswa **Kuliah Kerja Nyata Terpadu (KKN-T) Universitas Negeri Surabaya (UNESA) - PSDKU Magetan**.

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk kemajuan Desa Selorejo © 2026</p>
</div>
