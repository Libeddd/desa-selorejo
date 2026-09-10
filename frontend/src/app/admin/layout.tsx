"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Toast from "@/components/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const isLoggedIn = document.cookie.includes("admin_session=true");
        if (!isLoggedIn) {
          router.replace("/admin/login");
          return;
        }
      } else {
        setUserEmail(session.user.email || "");
      }
      setIsLoading(false);
    };

    checkSession();
  }, [pathname, router]);

  // Tutup profile menu jika klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup sidebar saat navigasi (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin w-8 h-8 text-[#1e3f20]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <p className="text-sm text-gray-500">Memuat Sistem...</p>
      </div>
    </div>
  );

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (path: string) => pathname === path;
  const menuClass = (path: string) =>
    isActive(path)
      ? "flex items-center gap-3 px-4 py-3.5 rounded-lg bg-white/10 text-white font-medium text-sm min-h-[44px]"
      : "flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#a3b1a3] hover:bg-white/5 hover:text-white transition-colors text-sm min-h-[44px]";

  let headerTitle = "Dashboard";
  if (pathname.includes("/berita")) headerTitle = "Kelola Berita";
  if (pathname.includes("/perangkat")) headerTitle = "Perangkat Desa";
  if (pathname.includes("/penduduk")) headerTitle = "Data Penduduk";
  if (pathname.includes("/umkm")) headerTitle = "Data UMKM";

  const initials = userEmail ? userEmail[0].toUpperCase() : "A";

  const navLinks = [
    {
      href: "/admin", label: "Dashboard",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
    },
    {
      href: "/admin/berita", label: "Kelola Berita",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    },
    {
      href: "/admin/perangkat", label: "Perangkat Desa",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    {
      href: "/admin/penduduk", label: "Data Penduduk",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
    },
    {
      href: "/admin/umkm", label: "Data UMKM",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#f8f9fa]">
      <Toast />

      {/* OVERLAY (HP — saat sidebar terbuka) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 flex-shrink-0 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <div>
          {/* Logo & tombol tutup sidebar di mobile */}
          <div className="p-5 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4a373] text-white flex items-center justify-center font-bold text-lg">DS</div>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Desa Selorejo</h2>
                <p className="text-[#a3b1a3] text-xs">Panel Admin</p>
              </div>
            </div>
            {/* Tombol X (close) — hanya tampil di HP */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#a3b1a3] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Tutup menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <nav className="px-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={menuClass(link.href)}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 mb-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#a3b1a3] hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm w-full min-h-[44px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — hanya tampil di HP */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Buka menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className="text-base md:text-lg font-bold text-gray-800">{headerTitle}</h1>
          </div>

          {/* PROFIL ADMIN — desktop: tampil penuh, HP: hanya avatar + dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-50 transition-colors min-h-[44px]"
              aria-label="Menu profil"
            >
              <div className="w-9 h-9 rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {initials}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800 leading-tight">{userEmail || "Admin Desa"}</p>
                <p className="text-xs text-gray-400 font-medium">Admin Desa</p>
              </div>
              {/* Chevron hanya di desktop */}
              <svg className="hidden md:block text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>

            {/* Dropdown profil */}
            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-xs text-gray-400 font-medium">Masuk sebagai</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{userEmail || "Admin Desa"}</p>
                </div>
                <button
                  onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium min-h-[44px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* AREA KONTEN — overflow-x-auto sudah di dalam tabel masing2 page */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}