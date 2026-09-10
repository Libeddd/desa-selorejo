"use client";

import { useState } from "react";

type Pengaduan = {
  id: number;
  nama: string;
  kategori: string;
  tanggal: string;
  status: "Baru" | "Diproses" | "Selesai";
  kontak: string;
  isi: string;
};

export default function AdminPengaduanPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Pengaduan | null>(null);

  const bukaDetail = (data: Pengaduan) => {
    setSelectedData(data);
    setIsPanelOpen(true);
  };

  const dataPengaduan: Pengaduan[] = [
    { id: 1, nama: "Budi Santoso", kategori: "Infrastruktur", tanggal: "8 Sep 2026", status: "Baru", kontak: "081234567890", isi: "Jalan di RT 03 rusak parah." },
    { id: 2, nama: "Siti Rahayu", kategori: "Sosial", tanggal: "7 Sep 2026", status: "Diproses", kontak: "082345678901", isi: "Bantuan sosial beras bulan ini belum merata di Dusun Dongol." },
    { id: 3, nama: "Hendra Wijaya", kategori: "Administrasi", tanggal: "6 Sep 2026", status: "Selesai", kontak: "083456789012", isi: "Pengurusan surat pengantar KK sangat cepat." },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Cari nama atau kategori..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" />
        </div>
        <div className="w-full md:w-auto">
          <select className="w-full bg-white border border-gray-200 text-gray-600 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#1e3f20] min-w-[150px]">
            <option>Semua</option>
            <option>Baru</option>
            <option>Diproses</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">No</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Nama Pelapor</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kategori</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 align-middle">
              {dataPengaduan.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-gray-400">{index + 1}</td>
                  <td className="py-4 px-6 font-medium text-gray-800">{item.nama}</td>
                  <td className="py-4 px-6 text-gray-500">{item.kategori}</td>
                  <td className="py-4 px-6">
                    {item.status === "Baru" && <span className="bg-red-50 text-red-500 font-bold px-3 py-1 rounded-md text-[10px]">Baru</span>}
                    {item.status === "Diproses" && <span className="bg-amber-50 text-amber-500 font-bold px-3 py-1 rounded-md text-[10px]">Diproses</span>}
                    {item.status === "Selesai" && <span className="bg-emerald-50 text-emerald-500 font-bold px-3 py-1 rounded-md text-[10px]">Selesai</span>}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button onClick={() => bukaDetail(item)} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors bg-white shadow-sm">
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PANEL DETAIL PENGADUAN (Slide dari Kanan) */}
      {isPanelOpen && selectedData && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setIsPanelOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">Detail Pengaduan</h2>
              <button onClick={() => setIsPanelOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Nama Pelapor</p>
                <p className="font-bold text-gray-800 text-sm">{selectedData.nama}</p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-2">Isi Pengaduan</p>
                <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed border border-gray-100">
                  {selectedData.isi}
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-2">Tanggapan Admin</p>
                <textarea className="w-full p-4 h-32 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20] resize-none" placeholder="Tulis tanggapan..."></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <button onClick={() => { alert("Tanggapan disimpan!"); setIsPanelOpen(false); }} className="w-full py-3 text-sm font-semibold text-white bg-[#1e3f20] hover:bg-[#152e17] rounded-xl shadow-sm">
                Simpan Tanggapan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}