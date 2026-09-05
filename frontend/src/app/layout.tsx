import type { Metadata } from "next";
import "./globals.css";

// 1. Ini bagian terpenting: Memanggil komponen Navbar yang baru saja dibuat
import Navbar from "@/components/Navbar"; 

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
        
        {/* 2. Meletakkan Navbar di paling atas body agar muncul di semua halaman */}
        <Navbar />
        
        {/* 3. Konten halaman akan muncul di bawah Navbar */}
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        
      </body>
    </html>
  );
}