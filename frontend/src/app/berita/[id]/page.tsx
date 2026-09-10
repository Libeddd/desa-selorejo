import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug } from '@/lib/database';

export default async function DetailBeritaPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  
  // Karena URL memakai slug (misal /berita/judul-berita), maka param id berisi slug
  const berita = await getNewsBySlug(resolvedParams.id);

  if (!berita) {
    notFound(); 
  }

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
      {/* Header Gelap agar Navbar terlihat */}
      <div 
        className="w-full pt-36 pb-32 px-6 lg:px-12 text-center relative flex flex-col items-center justify-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          <span 
            className="px-4 py-1.5 rounded-full text-xs font-bold text-white tracking-wide uppercase shadow-sm"
            style={{ background: "var(--sage-green, #6b8e6b)" }}
          >
            {berita.category}
          </span>
          <span className="text-sm text-white/80 flex items-center gap-1.5">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {formatTanggal(berita.published_at)}
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug max-w-4xl mx-auto drop-shadow-md">
          {berita.title}
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 -mt-20 relative z-10">
        
        {/* Tombol Kembali */}
        <Link 
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-70"
          style={{ color: "var(--dark-green, #1e3f20)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Kembali ke Daftar Berita
        </Link>

        {/* Gambar Cover */}
        <div className="w-full h-64 md:h-[400px] bg-gray-100 rounded-2xl mb-12 flex items-center justify-center relative overflow-hidden shadow-inner">
          {berita.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={berita.cover_image_url} alt={berita.title} className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          )}
        </div>

        {/* Paragraf Isi Berita */}
        <div className="prose prose-lg max-w-none text-gray-800 text-justify md:text-left font-sans">
          {berita.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
      </article>
    </main>
  );
}