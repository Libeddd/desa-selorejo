import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direktori UMKM",
  description:
    "Temukan produk dan jasa unggulan dari pelaku UMKM Desa Selorejo, Kabupaten Magetan.",
};

export default function UmkmPage() {
  // Data dummy UMKM (Bisa diganti dengan data asli dari database/API nanti)
  const UMKM_LIST = [
    { nama: "Keripik Tempe Bu Siti", kategori: "Makanan", deskripsi: "Keripik tempe renyah khas Magetan dengan berbagai varian rasa.", foto: "https://images.unsplash.com/photo-1599598425947-330026e680a6?w=400&h=300&fit=crop" },
    { nama: "Kerajinan Anyaman Bambu", kategori: "Kerajinan", deskripsi: "Berbagai perabotan dan hiasan rumah dari anyaman bambu berkualitas.", foto: "https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=400&h=300&fit=crop" },
    { nama: "Kopi Robusta Selorejo", kategori: "Minuman", deskripsi: "Kopi lokal hasil panen petani Selorejo yang dipanggang sempurna.", foto: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=300&fit=crop" },
    { nama: "Sambal Pecel Mbah Kung", kategori: "Makanan", deskripsi: "Bumbu pecel khas Jawa Timur yang praktis dan lezat.", foto: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop" },
    { nama: "Mebel Kayu Jati Pak Joyo", kategori: "Mebel", deskripsi: "Perabotan rumah tangga dari kayu jati asli dengan ukiran indah.", foto: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=300&fit=crop" },
    { nama: "Jamu Herbal Tradisional", kategori: "Kesehatan", deskripsi: "Minuman kesehatan dari rempah-rempah pilihan tanpa bahan pengawet.", foto: "https://images.unsplash.com/photo-1596755094514-f87e32f85ceb?w=400&h=300&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner - Tema yang sama dengan Perangkat Desa & Kontak */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Direktori UMKM
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Dukung perekonomian lokal dengan menemukan produk dan jasa unggulan dari pelaku UMKM Desa Selorejo, Kabupaten Magetan.
        </p>
      </div>

      {/* Konten Grid UMKM */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        
        {/* Opsional: Tempat untuk Filter / Kategori nanti */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex justify-center gap-4 flex-wrap">
          <button className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all" style={{ background: "var(--dark-green, #1e3f20)" }}>Semua</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">Makanan</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">Minuman</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">Kerajinan</button>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UMKM_LIST.map((umkm, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
            >
              {/* Foto UMKM */}
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img 
                  src={umkm.foto} 
                  alt={umkm.nama} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                    {umkm.kategori}
                  </span>
                </div>
              </div>
              
              {/* Info UMKM */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                  {umkm.nama}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {umkm.deskripsi}
                </p>
                
                {/* Tombol Aksi */}
                <button 
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2" 
                  style={{ background: "rgba(30,63,32,0.06)", color: "var(--dark-green, #1e3f20)" }}
                >
                  Lihat Detail Produk
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}