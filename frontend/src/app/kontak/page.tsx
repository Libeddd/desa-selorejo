export default function Kontak() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Hubungi Kami
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Punya pertanyaan, saran, atau keperluan administrasi? Silakan hubungi Pemerintah Desa Selorejo melalui kontak di bawah ini.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-8" style={{ color: "var(--dark-green, #1e3f20)" }}>
              Informasi Kontak
            </h2>
            
            <div className="space-y-8">
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Balai Desa Selorejo</h4>
                  <p className="text-gray-600 leading-relaxed mt-1">
                    Jl. Raya Selorejo No. 1, Kecamatan Kawedanan,<br />
                    Kabupaten Magetan, Jawa Timur 63382
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                  <p className="text-gray-600 mt-1">pemdes@selorejo-magetan.desa.id</p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Telepon / WhatsApp</h4>
                  <p className="text-gray-600 mt-1">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>
              Kirim Pesan
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input 
  type="text" 
  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6b8e6b] outline-none transition-all" 
  placeholder="Masukkan nama Anda"  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all" 
                  placeholder="Contoh: 08123456789" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan atau Keperluan</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all resize-none" 
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 shadow-lg" 
                style={{ background: "var(--dark-green, #1e3f20)", boxShadow: "0 4px 15px rgba(30,63,32,0.3)" }}
              >
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}