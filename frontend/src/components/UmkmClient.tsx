"use client";

import { useState } from "react";

export default function UmkmClient({ umkmList }: { umkmList: any[] }) {
  const [selectedUmkm, setSelectedUmkm] = useState<any | null>(null);

  // Fungsi untuk menutup modal jika background gelap diklik
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelectedUmkm(null);
  };

  if (umkmList.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">Belum ada data UMKM.</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid Card UMKM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {umkmList.map((umkm) => (
          <div
            key={umkm.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
          >
            {/* Foto UMKM */}
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              {/* Memperbaiki masalah gambar admin: Cek image_url atau cover_image_url */}
              {(umkm.image_url || umkm.cover_image_url) ? (
                <img
                  src={umkm.image_url || umkm.cover_image_url}
                  alt={umkm.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
                </div>
              )}
              {umkm.category && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--sage-green, #6b8e6b)" }}>
                    {umkm.category}
                  </span>
                </div>
              )}
            </div>

            {/* Info UMKM */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e3f20] transition-colors">
                {umkm.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
                {umkm.description}
              </p>

              {/* Tombol Aksi - Menampilkan Modal */}
              <button
                onClick={() => setSelectedUmkm(umkm)}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 mt-auto"
                style={{ background: "rgba(30,63,32,0.06)", color: "var(--dark-green, #1e3f20)" }}
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL POPUP DETAIL UMKM (Muncul saat tombol diklik) */}
      {selectedUmkm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Tombol Close (X) */}
            <button
              onClick={() => setSelectedUmkm(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {/* Gambar Modal dengan Lencana Kategori */}
            <div className="relative h-56 sm:h-72 w-full shrink-0 bg-gray-100">
              {(selectedUmkm.image_url || selectedUmkm.cover_image_url) ? (
                <img
                  src={selectedUmkm.image_url || selectedUmkm.cover_image_url}
                  alt={selectedUmkm.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              )}
              {selectedUmkm.category && (
                <div className="absolute bottom-4 left-6 px-3 py-1 bg-[#1e3f20] rounded-full shadow-md">
                  <span className="text-xs font-bold text-white tracking-wider uppercase">
                    {selectedUmkm.category}
                  </span>
                </div>
              )}
            </div>

            {/* Konten Text Modal */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                {selectedUmkm.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
                Pemilik: {selectedUmkm.owner_name} {selectedUmkm.rt ? `- RT ${selectedUmkm.rt}/RW ${selectedUmkm.rw}` : ''}
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                {selectedUmkm.description}
              </p>

              {/* Grid Info Detail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Alamat:</p>
                  <p className="text-gray-600">{selectedUmkm.address || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">WhatsApp:</p>
                  <p className="text-gray-600">{selectedUmkm.whatsapp || selectedUmkm.phone || '-'}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}