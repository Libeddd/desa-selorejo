import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getUmkmStores } from "@/lib/database";

export const metadata: Metadata = {
  title: "Direktori UMKM",
  description:
    "Temukan produk dan jasa unggulan dari pelaku UMKM Desa Selorejo, Kabupaten Magetan.",
};

export default async function UmkmPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const umkmList = await getUmkmStores(category);

  // Kategori statis untuk filter
  const categories = ["Makanan", "Minuman", "Kerajinan", "Jasa", "Lainnya"];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner - Tema yang sama dengan Perangkat Desa & Kontak */}
      <div 
        className="relative w-full pt-36 pb-16 px-6 lg:px-12 text-center overflow-hidden" 
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1786882546676-835df9107c1d?w=1600&h=400&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,63,32,0.4), rgba(30,63,32,0.85))",
          }}
        />
        <div className="relative z-10">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Direktori UMKM
          </h1>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
          <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
            Dukung perekonomian lokal dengan menemukan produk dan jasa unggulan dari pelaku UMKM Desa Selorejo, Kabupaten Magetan.
          </p>
        </div>
      </div>

      {/* Konten Grid UMKM */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        
        {/* Filter Kategori */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex justify-center gap-3 flex-wrap">
          <Link 
            href="/umkm"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              !category 
                ? "text-white" 
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            }`}
            style={!category ? { background: "var(--dark-green, #1e3f20)" } : {}}
          >
            Semua
          </Link>
          
          {categories.map((cat) => (
            <Link 
              key={cat}
              href={`/umkm?category=${cat}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? "text-white" 
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
              style={category === cat ? { background: "var(--dark-green, #1e3f20)" } : {}}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid Card */}
        {umkmList.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Belum ada data UMKM {category ? `untuk kategori ${category}` : ''}.</p>
            <p className="text-sm mt-2">Silakan tambahkan data melalui panel admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkmList.map((umkm) => (
              <div 
                key={umkm.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Foto UMKM */}
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  {umkm.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={umkm.cover_image_url} 
                      alt={umkm.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
                    </div>
                  )}
                  {umkm.category && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                        {umkm.category}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Info UMKM */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                    {umkm.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
                    {umkm.description}
                  </p>
                  
                  {/* Info Pemilik & Kontak */}
                  <div className="border-t border-gray-100 pt-4 mb-4 text-sm text-gray-600">
                    <p className="font-semibold text-gray-900 mb-1">Pemilik: {umkm.owner_name}</p>
                    {umkm.address && <p className="truncate">{umkm.address}</p>}
                    {umkm.whatsapp && <p className="text-green-600">WA: {umkm.whatsapp}</p>}
                  </div>
                  
                  {/* Tombol Aksi */}
                  <Link 
                    href={`/umkm/${umkm.slug}`}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2" 
                    style={{ background: "rgba(30,63,32,0.06)", color: "var(--dark-green, #1e3f20)" }}
                  >
                    Lihat Detail UMKM
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}