import Link from 'next/link';
import { notFound } from 'next/navigation';

// Data dummy berita
const BERITA_DATA = [
  {
    id: 1,
    kategori: "Kegiatan",
    tanggal: "10 September 2026",
    judul: "Kerja Bakti Pembersihan Saluran Irigasi Jelang Musim Hujan",
    konten: "Seluruh warga Desa Selorejo pada hari Minggu pagi berkumpul di sepanjang saluran irigasi utama desa. Kegiatan kerja bakti ini diinisiasi oleh Kepala Desa dalam rangka mengantisipasi datangnya musim penghujan yang diperkirakan akan turun bulan depan.\n\nSelain membersihkan sampah dan endapan lumpur, warga juga memperbaiki beberapa tanggul yang mulai terkikis. Diharapkan dengan kegiatan gotong royong ini, aliran air irigasi ke persawahan warga menjadi lancar dan risiko banjir dapat diminimalisir. Pemerintah desa juga mengimbau agar warga tidak membuang sampah sembarangan ke sungai."
  },
  {
    id: 2,
    kategori: "Pengumuman",
    tanggal: "05 September 2026",
    judul: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap 3",
    konten: "Pemerintah Desa Selorejo telah menyalurkan Bantuan Langsung Tunai (BLT) Dana Desa Tahap 3 kepada 120 Keluarga Penerima Manfaat (KPM). Acara pembagian dilaksanakan di Balai Desa Selorejo dengan tetap mematuhi antrean agar tertib.\n\nKepala Desa menyampaikan bahwa bantuan ini diharapkan dapat membantu meringankan beban ekonomi warga, terutama untuk memenuhi kebutuhan pokok sehari-hari. Penyaluran tahap selanjutnya akan diinformasikan lebih lanjut melalui Ketua RT masing-masing."
  },
  {
    id: 3,
    kategori: "Ekonomi",
    tanggal: "28 Agustus 2026",
    judul: "Pelatihan Pemasaran Digital untuk Pelaku UMKM Desa",
    konten: "Guna meningkatkan daya saing produk lokal, puluhan pelaku UMKM di Desa Selorejo diberikan pelatihan pemanfaatan media sosial dan e-commerce. Acara ini terselenggara berkat kerja sama antara BUMDes dan mahasiswa KKN.\n\nDalam pelatihan ini, peserta diajarkan cara memfoto produk agar menarik, membuat caption yang menjual, hingga cara membuka toko di platform online. Harapannya, produk unggulan desa seperti keripik dan anyaman bambu bisa menjangkau pasar yang lebih luas di seluruh Indonesia."
  },
  {
    id: 4,
    kategori: "Kesehatan",
    tanggal: "15 Agustus 2026",
    judul: "Pelaksanaan Posyandu Balita dan Lansia Serentak",
    konten: "Kader kesehatan Desa Selorejo sukses melaksanakan program Posyandu bulanan secara serentak di 3 dusun. Kegiatan ini difokuskan pada pemantauan gizi balita, penimbangan berat badan, serta pengecekan tensi dan gula darah bagi warga lanjut usia (lansia).\n\nAntusiasme warga sangat tinggi terlihat dari tingkat kehadiran yang mencapai 90%. Bidan desa juga memberikan penyuluhan singkat mengenai pentingnya makanan bergizi seimbang untuk mencegah stunting pada anak-anak."
  }
];

// PERUBAHAN DI SINI: Menambahkan async dan mengubah tipe params menjadi Promise
export default async function DetailBeritaPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // PERUBAHAN DI SINI: Menunggu (await) params sebelum mengambil ID-nya
  const resolvedParams = await params;
  
  // Mencari data berita yang ID-nya cocok dengan URL
  const berita = BERITA_DATA.find((b) => b.id.toString() === resolvedParams.id);

  // Jika ID tidak ada di data kita, tampilkan halaman 404 (Not Found)
  if (!berita) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-36">
      <article className="max-w-4xl mx-auto px-6 lg:px-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mt-4">
        
        {/* Tombol Kembali */}
        <Link 
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors hover:opacity-70"
          style={{ color: "var(--dark-green, #1e3f20)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Kembali ke Daftar Berita
        </Link>

        {/* Header Artikel */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white tracking-wide uppercase"
              style={{ background: "var(--sage-green, #6b8e6b)" }}
            >
              {berita.kategori}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {berita.tanggal}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-snug mb-6">
            {berita.judul}
          </h1>
        </header>

        {/* Gambar Cover (Masih Placeholder) */}
        <div className="w-full h-64 md:h-[400px] bg-gray-100 rounded-2xl mb-12 flex items-center justify-center relative overflow-hidden">
             <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>

        {/* Paragraf Isi Berita */}
        <div className="prose prose-lg max-w-none text-gray-700 text-justify md:text-left">
          {/* Memisahkan paragraf berdasarkan enter (\n) di data dummy */}
          {berita.konten.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-5 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
      </article>
    </main>
  );
}