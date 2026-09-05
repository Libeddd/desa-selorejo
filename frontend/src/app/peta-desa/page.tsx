import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Desa",
  description: "Peta lokasi dan batas wilayah Desa Selorejo, Kecamatan Kawedanan, Kabupaten Magetan.",
};

export default function PetaDesaPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Peta Desa
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Jelajahi lokasi, batas wilayah, dan titik-titik penting di Desa Selorejo, Kecamatan Kawedanan, Kabupaten Magetan.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-0 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
          
          {/* Frame Google Maps */}
          <div className="w-full aspect-square md:aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 relative shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=Desa%20Selorejo,%20Kawedanan,%20Magetan&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>

          {/* Informasi Tambahan (Opsional) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center lg:text-left px-4 lg:px-8 pb-4">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-green-50/50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 md:mx-0 mx-auto" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Lokasi Strategis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Terletak di Kecamatan Kawedanan, memudahkan akses ke berbagai fasilitas publik di Kabupaten Magetan.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-green-50/50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 md:mx-0 mx-auto" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Batas Wilayah</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Berbatasan langsung dengan desa-desa tetangga yang saling mendukung perputaran roda ekonomi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-green-50/50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 md:mx-0 mx-auto" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fasilitas Umum</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pusat pemerintahan (Balai Desa), masjid, sekolah, dan titik penting lainnya tersebar di dalam peta.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}