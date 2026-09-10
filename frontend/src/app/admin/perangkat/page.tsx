"use client";

import { useState } from "react";

export default function AdminPerangkatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Tambah" | "Edit">("Tambah");

  const openModal = (type: "Tambah" | "Edit") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Toolbar: Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Cari nama perangkat..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" />
        </div>
        <button onClick={() => openModal("Tambah")} className="w-full md:w-auto bg-[#1e3f20] hover:bg-[#152e17] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          + Tambah Perangkat
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">No</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Foto</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Nama</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Jabatan</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 align-middle">
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-gray-400">1</td>
                <td className="py-4 px-6"><img src="https://ui-avatars.com/api/?name=Agus+Widodo&background=random" alt="Agus Widodo" className="w-8 h-8 rounded-full object-cover" /></td>
                <td className="py-4 px-6 font-medium text-gray-800">Agus Widodo</td>
                <td className="py-4 px-6 text-gray-500">Kepala Desa</td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => openModal("Edit")} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                </td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-gray-400">2</td>
                <td className="py-4 px-6"><img src="https://ui-avatars.com/api/?name=Dewi+Lestari&background=random" alt="Dewi Lestari" className="w-8 h-8 rounded-full object-cover" /></td>
                <td className="py-4 px-6 font-medium text-gray-800">Dewi Lestari</td>
                <td className="py-4 px-6 text-gray-500">Sekretaris Desa</td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => openModal("Edit")} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL POP-UP (TAMBAH / EDIT PERANGKAT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-xl z-10 mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">{modalType} Perangkat</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
                <input type="text" defaultValue={modalType === "Edit" ? "Agus Widodo" : ""} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Jabatan</label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]">
                  <option selected={modalType === "Edit"}>Kepala Desa</option>
                  <option>Sekretaris Desa</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1e3f20] hover:bg-[#152e17] rounded-xl transition-colors shadow-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}