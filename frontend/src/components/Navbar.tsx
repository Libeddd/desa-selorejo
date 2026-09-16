"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi pembantu untuk menentukan gaya menu yang aktif
  const isActive = (path: string) => {
    return pathname === path 
      ? "text-white font-bold border-b-2 border-white pb-1" // Style jika sedang di halaman ini
      : "text-white/80 hover:text-white transition-colors";   // Style default
  };

  const isActiveMobile = (path: string) => {
    return pathname === path 
      ? "bg-white/20 text-white font-bold border-l-4 border-white" 
      : "text-white/90 hover:bg-white/10 transition-colors";
  };

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Desa", path: "/tentang-desa" },
    { name: "UMKM", path: "/umkm" },
    { name: "Peta Desa", path: "/peta-desa" },
    { name: "Perangkat Desa", path: "/perangkat-desa" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    // Background transparan agar menyatu dengan gambar latar belakang
    <nav className="absolute top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center md:justify-center">
        
        {/* Hamburger Menu Icon (Tampil hanya di HP) */}
        <div className="md:hidden w-full flex justify-end">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center bg-black/20 rounded-lg backdrop-blur-sm"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

        {/* Deretan Menu Navigasi Desktop (Sembunyi di HP) */}
        <ul className="hidden md:flex flex-wrap justify-center gap-6 lg:gap-8 text-base lg:text-lg font-medium drop-shadow-md">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className={isActive(link.path)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1e3f20]/95 backdrop-blur-md shadow-xl border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-4 text-base tracking-wide min-h-[44px] ${isActiveMobile(link.path)}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}