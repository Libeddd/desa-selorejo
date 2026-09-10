"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
          Selamat datang, Ahmad Fauzi <span className="text-2xl">👋</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">Berikut adalah ringkasan data Desa Selorejo hari ini.</p>
      </div>

      {/* Cards Grid (3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Berita */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-indigo-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">47</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Berita</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">+3 dari bulan lalu</p>
          </div>
        </div>

        {/* Card 2: Jumlah Penduduk */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-purple-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">3.284</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Jumlah Penduduk</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">+12 dari bulan lalu</p>
          </div>
        </div>



        {/* Card 4: Jumlah UMKM */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-cyan-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">62</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Jumlah UMKM</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">+2 dari bulan lalu</p>
          </div>
        </div>
      </div>

      {/* Tables Grid (1 Kolom) */}
      <div className="grid grid-cols-1 gap-6 pb-10">

        {/* Tabel Berita Terbaru */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm">Berita Terbaru</h3>
            <Link href="/admin/berita" className="text-xs text-gray-400 hover:text-gray-800">Lihat Semua &rarr;</Link>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider w-2/5">Judul</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kategori</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Tanggal</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600 align-middle">
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="py-4 font-medium text-gray-800 pr-4 truncate max-w-[150px]">Pembangunan Jalan Dusun...</td>
                  <td className="py-4 text-gray-500">Pembangunan</td>
                  <td className="py-4 text-gray-400">8 Sep 2026</td>
                  <td className="py-4 text-center"><button className="border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 px-3 py-1 rounded text-[10px] font-medium transition-colors">Edit</button></td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="py-4 font-medium text-gray-800 pr-4 truncate max-w-[150px]">Posyandu Rutin Bulan Septe...</td>
                  <td className="py-4 text-gray-500">Kesehatan</td>
                  <td className="py-4 text-gray-400">7 Sep 2026</td>
                  <td className="py-4 text-center"><button className="border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 px-3 py-1 rounded text-[10px] font-medium transition-colors">Edit</button></td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="py-4 font-medium text-gray-800 pr-4 truncate max-w-[150px]">Festival Panen Raya 2026 D...</td>
                  <td className="py-4 text-gray-500">Budaya</td>
                  <td className="py-4 text-gray-400">5 Sep 2026</td>
                  <td className="py-4 text-center"><button className="border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 px-3 py-1 rounded text-[10px] font-medium transition-colors">Edit</button></td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="py-4 font-medium text-gray-800 pr-4 truncate max-w-[150px]">Rapat Desa Terbuka Memba...</td>
                  <td className="py-4 text-gray-500">Administrasi</td>
                  <td className="py-4 text-gray-400">1 Sep 2026</td>
                  <td className="py-4 text-center"><button className="border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 px-3 py-1 rounded text-[10px] font-medium transition-colors">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}