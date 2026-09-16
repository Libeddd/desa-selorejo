import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Potensi Pertanian",
  description: "Detail potensi pertanian di Desa Selorejo.",
};

export default function PotensiPertanian() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: "var(--beige, #f5f5dc)" }} />
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--beige, #f5f5dc)" }}>
            Potensi Desa
          </span>
          <div className="h-px w-10" style={{ background: "var(--beige, #f5f5dc)" }} />
        </div>
        
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Sektor Pertanian
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Lahan pertanian produktif dengan hasil padi, sayuran, dan tanaman pangan unggulan yang menjadi tumpuan ekonomi warga.
        </p>
      </div>

      {/* Konten Detail */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12">
        <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>
            Deskripsi Potensi
          </h2>
          
          <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              Desa Selorejo memiliki lahan pertanian yang subur dan pengairan yang cukup baik. Mayoritas masyarakat desa mengandalkan sektor ini sebagai penggerak roda ekonomi utama.
            </p>
            <p>
              Hasil bumi yang paling menonjol dari desa ini meliputi padi, jagung, dan berbagai macam sayur-mayur segar yang sering kali langsung didistribusikan ke pasar-pasar kecamatan.
            </p>
            {/* Anda bisa menambahkan paragraf atau gambar pendukung di sini nantinya */}
          </div>

          {/* Navigasi Kembali */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-start">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--dark-green, #1e3f20)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}