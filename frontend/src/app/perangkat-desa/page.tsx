export default function PerangkatDesa() {
  // Data dummy perangkat desa (Bisa diganti dengan data asli)
  const PERANGKAT = [
    { nama: "Budi Santoso", jabatan: "Kepala Desa", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { nama: "Siti Aminah", jabatan: "Sekretaris Desa", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { nama: "Ahmad Fauzi", jabatan: "Kaur Keuangan", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
    { nama: "Ratna Sari", jabatan: "Kaur Perencanaan", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { nama: "Joko Widodo", jabatan: "Kasi Pemerintahan", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { nama: "Dewi Lestari", jabatan: "Kasi Kesejahteraan", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner - Latar gelap agar Navbar terbaca */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Perangkat Desa
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Mengenal lebih dekat para pelayan masyarakat yang berdedikasi untuk kemajuan dan kesejahteraan Desa Selorejo.
        </p>
      </div>

      {/* Konten Grid Card */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERANGKAT.map((person, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={person.foto} 
                  alt={person.nama} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--dark-green, #1e3f20)" }}>
                  {person.nama}
                </h3>
                <p className="text-sm font-medium tracking-wide uppercase" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                  {person.jabatan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}