import type { Metadata } from "next";
import Link from "next/link";
import { getUmkmStores } from "@/lib/database";
import UmkmClient from "@/components/UmkmClient"; // Memanggil komponen popup yang baru

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
      
      {/* Header / Banner */}
      <div className="relative w-full pt-36 pb-16 px-6 lg:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1786882546676-835df9107c1d?w=1600&h=400&fit=crop&auto=format')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to bottom, rgba(30,63,32,0.4), rgba(30,63,32,0.85))" }} />
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

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        
        {/* Filter Kategori */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex justify-center gap-3 flex-wrap">
          <Link 
            href="/umkm"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!category ? "text-white bg-[#1e3f20]" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
          >
            Semua
          </Link>
          
          {categories.map((cat) => (
            <Link 
              key={cat}
              href={`/umkm?category=${cat}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${category === cat ? "text-white bg-[#1e3f20]" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Memanggil Grid dan Popup Modal */}
        <UmkmClient umkmList={umkmList} />

      </div>
    </main>
  );
}