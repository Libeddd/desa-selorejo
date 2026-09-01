import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Desa",
  description:
    "Sejarah, visi-misi, dan struktur pemerintahan Desa Selorejo, Kabupaten Magetan.",
};

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Desa</h1>
        <p className="text-gray-500 mb-8">Desa Selorejo, Kabupaten Magetan</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-3">Visi</h2>
            <p className="text-gray-600 bg-green-50 p-4 rounded-lg">
              Mewujudkan Desa Selorejo yang maju, mandiri, dan sejahtera
              berlandaskan nilai-nilai gotong royong.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-3">Misi</h2>
            <ul className="text-gray-600 space-y-2 bg-green-50 p-4 rounded-lg">
              <li>• Meningkatkan kualitas pelayanan publik</li>
              <li>• Mengembangkan potensi UMKM lokal</li>
              <li>• Meningkatkan infrastruktur desa</li>
              <li>• Melestarikan budaya dan tradisi lokal</li>
            </ul>
          </div>
        </div>

        {/* Struktur Perangkat Desa - akan diisi dari API */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Struktur Perangkat Desa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Kepala Desa",
              "Sekretaris Desa",
              "Kaur Keuangan",
              "Kaur Umum",
            ].map((jabatan) => (
              <div
                key={jabatan}
                className="bg-gray-100 rounded-lg p-4 text-center"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{jabatan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
