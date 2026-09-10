"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FloatingActionButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Jangan tampilkan di halaman admin
  const isHidden = pathname?.startsWith("/admin");

  useEffect(() => {
    // Efek fade-in setelah sedikit delay agar tidak mengganggu load awal
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isHidden || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in zoom-in slide-in-from-bottom-5 duration-500">
      <Link 
        href="/kontak"
        className="flex items-center justify-center w-14 h-14 bg-[#1e3f20] text-white rounded-full shadow-xl hover:bg-[#152e17] hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 group relative"
        aria-label="Lapor / Pengaduan"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          Layanan Aduan / Kontak
        </span>
      </Link>
    </div>
  );
}
