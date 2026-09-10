import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedNews } from "@/lib/database";

export const metadata: Metadata = {
  title: "Berita Desa",
  description: "Kabar terbaru, pengumuman, dan kegiatan masyarakat Desa Selorejo.",
};

export default async function BeritaPage() {
  const beritaList = await getPublishedNews();

  function formatTanggal(dateStr: string | null): string {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner */}
      <div 
        className="w-full pt-36 pb-20 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Kabar Desa
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Informasi terkini, pengumuman, dan liputan kegiatan seputar masyarakat Desa Selorejo.
        </p>
      </div>

      {/* Konten Utama - Grid Berita */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-10">
        {beritaList.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-300">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
            </svg>
            <p className="text-gray-500 text-lg">Belum ada berita yang diterbitkan.</p>
            <p className="text-gray-400 text-sm mt-2">Tambahkan berita melalui panel admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <article 
                key={berita.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                {/* Thumbnail Gambar */}
                <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  {berita.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={berita.cover_image_url}
                      alt={berita.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                  )}
                  {/* Badge Kategori */}
                  <span 
                    className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white capitalize"
                    style={{ background: "var(--sage-green, #6b8e6b)" }}
                  >
                    {berita.category}
                  </span>
                </div>

                {/* Isi Berita */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {formatTanggal(berita.published_at)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-800 transition-colors">
                    {berita.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {berita.excerpt ?? berita.content.substring(0, 150) + "..."}
                  </p>
                  
                  {/* Tombol Baca Selengkapnya */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      href={`/berita/${berita.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: "var(--dark-green, #1e3f20)" }}
                    >
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
