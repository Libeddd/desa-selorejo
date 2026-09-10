"use client";

import { usePathname } from "next/navigation";

export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Jika URL saat ini diawali dengan "/admin" (termasuk /admin/login), hilangkan isinya (return null)
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Jika halaman publik biasa, tampilkan seperti biasa
  return <>{children}</>;
}