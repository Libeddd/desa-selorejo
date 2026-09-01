import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direktori UMKM",
  description:
    "Temukan produk dan jasa unggulan dari pelaku UMKM Desa Selorejo, Kabupaten Magetan.",
};

export default function UmkmPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Direktori UMKM
        </h1>
        <p className="text-gray-500 mb-8">
          Desa Selorejo, Kabupaten Magetan
        </p>
        {/* Filter dan daftar UMKM akan diimplementasikan berikutnya */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
