import type { Metadata } from "next";
import { getVillageInfo } from "@/lib/database";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Pemerintah Desa Selorejo, Kawedanan, Magetan.",
};

export default async function Kontak() {
  const info = await getVillageInfo();

  const address = info?.address || "Jl. Raya Selorejo No. 1, Kecamatan Kawedanan, Kabupaten Magetan, Jawa Timur 63382";
  const email = info?.email || "pemdes.selorejo@magetan.go.id";
  const phone = info?.phone || "-";

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
                  <p className="text-gray-600 leading-relaxed mt-1">{address}</p>
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
                  <a href={`mailto:${email}`} className="text-gray-600 mt-1 hover:underline">{email}</a>
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
                  {phone !== "-" ? (
                    <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 mt-1 hover:underline">{phone}</a>
                  ) : (
                    <p className="text-gray-400 mt-1 text-sm italic">Belum tersedia</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak (via WhatsApp) */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>
              Kirim Pesan
            </h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const nama = (form.elements.namedItem('nama') as HTMLInputElement).value;
                const noHp = (form.elements.namedItem('nohp') as HTMLInputElement).value;
                const pesan = (form.elements.namedItem('pesan') as HTMLTextAreaElement).value;
                const teks = `Halo, saya *${nama}* (${noHp}).\n\n${pesan}`;
                const waNumber = phone.replace(/\D/g, '') || '6285100000000';
                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(teks)}`, '_blank');
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  name="nama"
                  type="text" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6b8e6b] outline-none transition-all" 
                  placeholder="Masukkan nama Anda"  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp</label>
                <input 
                  name="nohp"
                  type="text" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all" 
                  placeholder="Contoh: 08123456789" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan atau Keperluan</label>
                <textarea 
                  name="pesan"
                  rows={4} 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all resize-none" 
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2" 
                style={{ background: "var(--dark-green, #1e3f20)", boxShadow: "0 4px 15px rgba(30,63,32,0.3)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Kirim via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}