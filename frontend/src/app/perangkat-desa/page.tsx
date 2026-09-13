import type { Metadata } from "next";
import Image from "next/image";
import { getVillageOfficials } from "@/lib/database";

export const metadata: Metadata = {
  title: "Perangkat Desa",
  description: "Mengenal para pelayan masyarakat Desa Selorejo.",
};

export default async function PerangkatDesa() {
  const perangkat = await getVillageOfficials();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner */}
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
            background: "linear-gradient(to bottom, rgba(30,63,32,0.85), rgba(30,63,32,0.98))",
          }}
        />
        <div className="relative z-10">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Perangkat Desa
          </h1>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
          <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
            Mengenal lebih dekat para pelayan masyarakat yang berdedikasi untuk kemajuan dan kesejahteraan Desa Selorejo.
          </p>
        </div>
      </div>

      {/* Konten Grid Card */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        {perangkat.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Belum ada data perangkat desa.</p>
            <p className="text-sm mt-2">Silakan tambahkan data melalui panel admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {perangkat.map((person) => (
              <div 
                key={person.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  {person.photo_url ? (
                    <Image
                      src={person.photo_url} 
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "var(--dark-green, #1e3f20)" }}>
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium tracking-wide uppercase" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                    {person.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}