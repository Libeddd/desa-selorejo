import type { Metadata } from "next";
import { getVillageInfo } from "@/lib/database";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Pemerintah Desa Selorejo, Kawedanan, Magetan.",
};

export default async function Kontak() {
  const info = await getVillageInfo();

  const address = "89FW+M7W, Selorejo, Kawedanan, Dongol, Selorejo, Kec. Magetan, Kabupaten Magetan, Jawa Timur 63382";
  const phone = info?.phone || "-";

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
            background: "linear-gradient(to bottom, rgba(30,63,32,0.4), rgba(30,63,32,0.85))",
          }}
        />
        <div className="relative z-10">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Hubungi Kami
          </h1>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
          <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
            Punya pertanyaan, saran, atau keperluan administrasi? Silakan hubungi Pemerintah Desa Selorejo melalui kontak di bawah ini.
          </p>
        </div>
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


              {/* Peta Google Maps Balai Desa */}
              <div 
                className="w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden mt-6" 
                style={{ border: "1px solid rgba(216,203,168,0.6)", boxShadow: "0 10px 40px rgba(35,69,44,0.1)" }}
              >
                <iframe
                  title="Peta Balai Desa Selorejo"
                  src="https://maps.google.com/maps?q=Balai+Desa+Selorejo+Magetan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak (via WhatsApp) */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>
              Kirim Pesan
            </h2>
            <ContactForm phone={phone} />
          </div>

        </div>
      </div>
    </main>
  );
}