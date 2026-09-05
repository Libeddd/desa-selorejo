"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Fungsi pembantu untuk menentukan gaya menu yang aktif
  const isActive = (path: string) => {
    return pathname === path 
      ? "text-white font-bold border-b-2 border-white pb-1" // Style jika sedang di halaman ini
      : "text-white/80 hover:text-white transition-colors";   // Style default
  };

  return (
    // Background transparan agar menyatu dengan gambar latar belakang
    <nav className="absolute top-0 w-full z-50 p-6">
      <div className="container mx-auto flex justify-center">
        
        {/* Deretan Menu Navigasi */}
        <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-base md:text-lg font-medium drop-shadow-md">
          <li>
            <Link href="/" className={isActive("/")}>
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/tentang-desa" className={isActive("/tentang-desa")}>
              Tentang Desa
            </Link>
          </li>
          <li>
            <Link href="/umkm" className={isActive("/umkm")}>
              UMKM
            </Link>
          </li>
          <li>
            <Link href="/peta-desa" className={isActive("/peta-desa")}>
              Peta Desa
            </Link>
          </li>
          <li>
            <Link href="/perangkat-desa" className={isActive("/perangkat-desa")}>
              Perangkat Desa
            </Link>
          </li>
          <li>
            <Link href="/kontak" className={isActive("/kontak")}>
              Kontak
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}