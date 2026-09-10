import type { Metadata } from "next";
import Link from "next/link";
import { getVillageInfo } from "@/lib/database";

export const metadata: Metadata = {
  title: "Tentang Desa",
  description:
    "Sejarah, visi-misi, dan struktur pemerintahan Desa Selorejo, Kabupaten Magetan.",
};

export default async function TentangDesaPage() {
  const villageInfo = await getVillageInfo();
  
  // Parse mission safely
  let missions: string[] = [];
  try {
    if (villageInfo?.mission) {
      missions = JSON.parse(villageInfo.mission);
    }
  } catch (e) {
    // If it's not JSON, maybe it's just a string or list
    if (typeof villageInfo?.mission === 'string') {
      missions = [villageInfo.mission];
    }
  }

  // Fallback Visi Misi jika kosong
  const visi = villageInfo?.vision || "Mewujudkan Desa Selorejo yang maju, mandiri, dan sejahtera berlandaskan nilai-nilai gotong royong.";
  const defaultMissions = [
    "Meningkatkan kualitas pelayanan publik secara transparan.",
    "Mengembangkan potensi UMKM dan ekonomi warga.",
    "Meningkatkan infrastruktur desa secara merata.",
    "Melestarikan budaya dan tradisi lokal Desa Selorejo."
  ];

  const finalMissions = missions.length > 0 ? missions : defaultMissions;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header / Banner - Selaras dengan halaman lainnya */}
      <div 
        className="w-full pt-36 pb-16 px-6 lg:px-12 text-center" 
        style={{ background: "var(--dark-green, #1e3f20)" }}
      >
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Tentang Desa
        </h1>
        <div className="h-px w-16 mx-auto mb-6" style={{ background: "var(--beige, #f5f5dc)" }} />
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
          Mengenal lebih dekat sejarah, kondisi geografis, visi, misi, serta nilai-nilai luhur masyarakat Desa Selorejo.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-8 relative z-10 space-y-8 lg:space-y-12">
        
        {/* Section 1: Selayang Pandang & Geografis */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--dark-green, #1e3f20)" }}>
                Selayang Pandang
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Desa Selorejo merupakan salah satu desa yang terletak di Kecamatan Kawedanan, Kabupaten Magetan, Provinsi Jawa Timur. Dengan kekayaan alam dan semangat gotong royong yang tinggi, desa ini terus berkembang menjadi desa yang mandiri, berdaya saing, dan tetap memegang teguh kearifan lokal.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Desa Selorejo berdiri sejak tahun <strong>1669</strong>, mengacu pada berdirinya Kabupaten Magetan.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Kondisi Geografis</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Luas Wilayah</span>
                  <span className="font-bold">298,3 Ha</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Luas Sawah</span>
                  <span className="font-bold">105 Ha</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Luas Kebun</span>
                  <span className="font-bold">35 Ha</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Luas Pemukiman</span>
                  <span className="font-bold">150 Ha</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Ketinggian (mdpl)</span>
                  <span className="font-bold">800 mdpl</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Topografi</span>
                  <span className="font-bold">Dataran Rendah</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-500">Koordinat</span>
                  <span className="font-bold text-xs">7.6756955° S, 111.3957285° E</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="font-medium text-gray-500">Suhu Udara</span>
                  <span className="font-bold">30-33° C</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
               <h4 className="font-bold text-gray-800 mb-2">Batas Wilayah</h4>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li><strong>Utara:</strong> Ds. Sugihrejo (Kec. Kawedanan)</li>
                 <li><strong>Selatan:</strong> Ds. Mangunrejo (Kec. Kawedanan)</li>
                 <li><strong>Barat:</strong> Ds. Banjarejo (Kec. Ngariboyo)</li>
                 <li><strong>Timur:</strong> Ds. Jambangan (Kec. Kawedanan)</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-gray-800 mb-2">Jarak Pusat Pemerintahan</h4>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li><strong>Kecamatan:</strong> 4,3 Km</li>
                 <li><strong>Kabupaten:</strong> 8,5 Km</li>
                 <li><strong>Provinsi:</strong> 188 Km</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-gray-800 mb-2">Dusun / Lingkungan (3 RW, 20 RT)</h4>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li><strong>Dongol:</strong> 95,5 Ha (RW 01, RT 1-6)</li>
                 <li><strong>Selorejo:</strong> 101,1 Ha (RW 02, RT 7-13)</li>
                 <li><strong>Ponggok:</strong> 107,7 Ha (RW 03, RT 14-20)</li>
               </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Visi dan Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card Visi */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 h-full transition-shadow hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--dark-green, #1e3f20)" }}>Visi</h2>
            <p className="text-gray-700 text-xl font-medium leading-relaxed italic">
              "{visi}"
            </p>
          </div>

          {/* Card Misi */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 h-full transition-shadow hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(30,63,32,0.08)", color: "var(--dark-green, #1e3f20)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "var(--dark-green, #1e3f20)" }}>Misi</h2>
            <ul className="space-y-4">
              {finalMissions.map((misi, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: "var(--sage-green, #6b8e6b)" }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed text-base">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Struktur Perangkat Desa Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 text-center">
          <h2 className="text-2xl font-serif font-bold mb-8" style={{ color: "var(--dark-green, #1e3f20)" }}>
            Struktur Pemerintahan Desa
          </h2>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-x-8 gap-y-10 mb-10 max-w-4xl mx-auto">
            {[
              "Kepala Desa",
              "Sekretaris Desa",
              "Kaur Tata Usaha dan Umum",
              "Kaur Keuangan",
              "Kaur Perencanaan",
              "Kasi Pemerintahan",
              "Kasi Kesejahteraan",
              "Kasi Pelayanan",
            ].map((jabatan, index) => (
              <div key={index} className="flex flex-col items-center w-36">
                <div className="w-16 h-16 bg-gray-50 rounded-full mb-3 border border-dashed border-gray-300 flex items-center justify-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <p className="text-[10px] font-bold text-gray-800 text-center leading-tight uppercase tracking-wider" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                  {jabatan}
                </p>
              </div>
            ))}
          </div>
          
          <Link 
            href="/perangkat-desa"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ background: "var(--dark-green, #1e3f20)", color: "white" }}
          >
            Lihat Struktur Organisasi & Perangkat Desa
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>
    </main>
  );
}