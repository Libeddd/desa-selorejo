"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Untuk melacak kita sedang di halaman mana
  const [isLoading, setIsLoading] = useState(true);

  // 1. Pengecekan Login Terpusat
  useEffect(() => {
    // Jika sedang di halaman login, biarkan saja
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const isLoggedIn = document.cookie.includes("admin_session=true");
    if (!isLoggedIn) {
      router.replace("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Memuat Sistem...</div>;

  // Jika ini halaman login, render halamannya saja tanpa Sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 2. Fungsi untuk menentukan menu mana yang sedang aktif menyala
  const isActive = (path: string) => pathname === path;
  const menuClass = (path: string) => 
    isActive(path)
      ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium text-sm" // Style Aktif
      : "flex items-center gap-3 px-4 py-3 rounded-lg text-[#a3b1a3] hover:bg-white/5 hover:text-white transition-colors text-sm"; // Style Tidak Aktif

  // 3. Menentukan Judul Header otomatis berdasarkan halaman
  let headerTitle = "Dashboard";
  if (pathname.includes("/berita")) headerTitle = "Kelola Berita";
  if (pathname.includes("/perangkat")) headerTitle = "Perangkat Desa";
  if (pathname.includes("/penduduk")) headerTitle = "Data Penduduk";
  if (pathname.includes("/pengaduan")) headerTitle = "Pengaduan Masyarakat";

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#f8f9fa]">
      
      {/* SIDEBAR (Hanya ditulis 1 kali di sini) */}
      <aside className="w-64 flex-shrink-0 flex flex-col justify-between" style={{ background: "var(--dark-green, #1e3f20)" }}>
        <div>
          <div className="p-6 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#d4a373] text-white flex items-center justify-center font-bold text-lg">DS</div>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">Desa Selorejo</h2>
              <p className="text-[#a3b1a3] text-xs">Panel Admin</p>
            </div>
          </div>

          <nav className="px-4 space-y-1.5">
            <Link href="/admin" className={menuClass("/admin")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
              Dashboard
            </Link>
            <Link href="/admin/berita" className={menuClass("/admin/berita")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Kelola Berita
            </Link>
            <Link href="/admin/perangkat" className={menuClass("/admin/perangkat")}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Perangkat Desa
            </Link>
            <Link href="/admin/penduduk" className={menuClass("/admin/penduduk")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              Data Penduduk
            </Link>
            <Link href="/admin/umkm" className={menuClass("/admin/umkm")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Data UMKM
            </Link>
            <Link href="/admin/pengaduan" className={menuClass("/admin/pengaduan")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Pengaduan
            </Link>
          </nav>
        </div>
        <div className="p-4 mb-2">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#a3b1a3] hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm w-full">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-800">{headerTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-sm">AF</div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-800 leading-tight">Ahmad Fauzi</p>
              <p className="text-xs text-gray-400 font-medium">Admin Desa</p>
            </div>
          </div>
        </header>

        {/* AREA KONTEN (Halaman-halaman akan dirender di dalam {children} ini) */}
        <main className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}