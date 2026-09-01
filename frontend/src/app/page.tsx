import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Selamat datang di website resmi Desa Selorejo, Kabupaten Magetan. Temukan informasi terkini tentang desa kami dan direktori UMKM lokal.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🌿 Desa Selorejo
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-2">
            Kabupaten Magetan, Jawa Timur
          </p>
          <p className="text-lg text-green-200 mt-4 max-w-2xl mx-auto">
            Website resmi desa yang menampilkan profil desa dan direktori UMKM
            lokal untuk mendukung ekonomi masyarakat.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="/profil"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Profil Desa
            </a>
            <a
              href="/umkm"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Direktori UMKM
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Penduduk", value: "±2.500", icon: "👥" },
            { label: "KK", value: "±650", icon: "🏠" },
            { label: "UMKM", value: "25+", icon: "🏪" },
            { label: "Produk Lokal", value: "100+", icon: "🛍️" },
          ].map((stat) => (
            <div key={stat.label} className="p-4">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-700">
                {stat.value}
              </div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UMKM Section Placeholder */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            UMKM Unggulan
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Produk dan jasa terbaik dari warga Desa Selorejo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 animate-pulse"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/umkm"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Lihat Semua UMKM →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100 py-8 px-6 text-center">
        <p className="font-semibold">Desa Selorejo, Kabupaten Magetan</p>
        <p className="text-sm mt-1 text-green-300">
          Website dikembangkan oleh KKN-T UNESA 2026 | Teknik Informatika
        </p>
      </footer>
    </main>
  );
}
