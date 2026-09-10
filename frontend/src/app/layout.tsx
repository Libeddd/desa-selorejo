import type { Metadata } from "next";
import "./globals.css";

// 1. Memanggil komponen dengan tanda ./ (karena folder components ada di sebelah file ini)
import Navbar from "../components/Navbar"; 
import HideOnAdmin from "../components/HideOnAdmin";

export const metadata: Metadata = {
  title: {
    template: "%s | Desa Selorejo",
    default: "Desa Selorejo - Kabupaten Magetan",
  },
  description:
    "Website resmi Desa Selorejo, Kabupaten Magetan. Temukan informasi desa, profil perangkat desa, berita terbaru, dan direktori UMKM lokal.",
  keywords: [
    "Desa Selorejo",
    "Magetan",
    "Jawa Timur",
    "UMKM",
    "Profil Desa",
    "KKN UNESA",
  ],
  authors: [{ name: "KKN-T UNESA" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Desa Selorejo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        
        {/* Navbar dibungkus penjaga agar tidak muncul di halaman Admin */}
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        
        {/* Konten halaman utama */}
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        
      </body>
    </html>
  );
}