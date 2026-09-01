# 🌿 Website Desa Selorejo

**Website Profil Desa Selorejo + Direktori UMKM**  
KKN-T Universitas Negeri Surabaya | Kabupaten Magetan

---

## 📋 Tentang Proyek

Website ini dibangun sebagai bagian dari program KKN-T UNESA untuk:
- Menampilkan profil dan informasi Desa Selorejo
- Membantu UMKM lokal memperluas jangkauan dengan direktori toko & produk

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 15 (App Router, TypeScript) |
| Backend/API | Laravel 11 (PHP 8.x) |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS |
| Deploy Frontend | Vercel |
| Deploy Backend | Railway / Render |

## 📁 Struktur Proyek

```
desa-selorejo/
├── frontend/          # Next.js App
│   ├── src/
│   │   ├── app/       # Pages & layouts (App Router)
│   │   ├── components/
│   │   └── lib/       # Supabase client, API utils
│   ├── .env.local.example
│   └── package.json
│
├── backend/           # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   └── Models/
│   ├── routes/api.php
│   ├── .env.example
│   └── composer.json
│
└── README.md
```

## 🚀 Cara Menjalankan (Development)

### Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local dengan kredensial Supabase
npm run dev
# Buka http://localhost:3000
```

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Edit .env dengan kredensial Supabase PostgreSQL
php artisan migrate
php artisan serve
# Buka http://localhost:8000
```

## 🌐 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/village` | Info desa |
| GET | `/api/umkm` | List semua UMKM |
| GET | `/api/umkm/{id}` | Detail UMKM |
| GET | `/api/umkm/{id}/products` | Produk UMKM |
| GET | `/api/products` | Semua produk |
| GET | `/api/news` | Berita desa |

## 👥 Tim KKN-T

- Universitas Negeri Surabaya
- Program Studi Teknik Informatika
- Desa Selorejo, Kecamatan ..., Kabupaten Magetan

## 📄 Lisensi

MIT License - Proyek KKN-T UNESA 2026
