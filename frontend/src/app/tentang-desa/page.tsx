import type { Metadata } from "next";
import Link from "next/link"; // Import ini untuk menyambungkan ke halaman Perangkat Desa

export const metadata: Metadata = {
  title: "Tentang Desa",
  description:
    "Sejarah, visi-misi, dan struktur pemerintahan Desa Selorejo, Kabupaten Magetan.",
};

export default function TentangDesaPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner - Selaras dengan halaman lainnya */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Tentang Desa
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Mengenal lebih dekat sejarah, visi, misi, serta nilai-nilai luhur yang menjadi pedoman masyarakat Desa Selorejo.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-8 relative z-10 space-y-8 lg:space-y-12">
        
        {/* Section 1: Selayang Pandang (Pengantar) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
           <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--dark-green, #1e3f20)" }}>
             Selayang Pandang
           </h2>
           <p className="text-gray-600 leading-relaxed text-lg">
             Desa Selorejo merupakan salah satu desa yang terletak di Kecamatan Kawedanan, Kabupaten Magetan, Provinsi Jawa Timur. Dengan kekayaan alam dan semangat gotong royong yang tinggi, desa ini terus berkembang menjadi desa yang mandiri, berdaya saing, dan tetap memegang teguh kearifan lokal.
           </p>
        </div>

        {/* Section 2: Visi dan Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Visi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 h-full transition-shadow hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--dark-green, #1e3f20)" }}>Visi</h2>
            <p className="text-gray-700 text-xl font-medium leading-relaxed italic">
              "Mewujudkan Desa Selorejo yang maju, mandiri, dan sejahtera berlandaskan nilai-nilai gotong royong."
            </p>
          </div>

          {/* Card Misi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 h-full transition-shadow hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>Misi</h2>
            <ul className="space-y-4">
              {[
                "Meningkatkan kualitas pelayanan publik secara transparan.",
                "Mengembangkan potensi UMKM dan ekonomi warga.",
                "Meningkatkan infrastruktur desa secara merata.",
                "Melestarikan budaya dan tradisi lokal Desa Selorejo."
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: "var(--sage-green, #6b8e6b)" }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed text-lg">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Struktur Perangkat Desa Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 text-center">
          <h2 className="text-2xl font-serif font-bold mb-8" style={{ color: "var(--dark-green, #1e3f20)" }}>
            Struktur Pemerintahan Desa
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              "Kepala Desa",
              "Sekretaris Desa",
              "Kaur Keuangan",
              "Kaur Umum",
            ].map((jabatan, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full mb-4 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                  {/* Ikon User Placeholder */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <p className="text-sm font-bold text-gray-800 mb-1">Nama Pejabat</p>
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--sage-green, #6b8e6b)" }}>{jabatan}</p>
              </div>
            ))}
          </div>
          
          {/* Tombol yang mengarah ke halaman Perangkat Desa */}
          <Link 
            href="/perangkat-desa"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ background: "var(--dark-green, #1e3f20)", color: "white" }}
          >
            Lihat Seluruh Perangkat Desa
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>
    </main>
  );
}