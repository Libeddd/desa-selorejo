import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
