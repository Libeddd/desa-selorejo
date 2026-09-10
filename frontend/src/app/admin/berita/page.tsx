"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminBeritaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Tambah" | "Edit">("Tambah");

  const openModal = (type: "Tambah" | "Edit") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Toolbar: Search, Filter, Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Cari judul berita..." 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="bg-white border border-gray-200 text-gray-600 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#1e3f20] min-w-[120px]">
            <option>Semua</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          
          <button 
            onClick={() => openModal("Tambah")}
            className="bg-[#1e3f20] hover:bg-[#152e17] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            + Tambah Berita
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">No</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Thumbnail</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Judul</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kategori</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Tanggal</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 align-middle">
              
              {/* Row 1 */}
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-gray-400">1</td>
                <td className="py-4 px-6">
                  <div className="w-12 h-8 bg-gray-200 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1541888081273-0498a9d1edb6?auto=format&fit=crop&w=100&q=80" alt="thumb" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-gray-800">Pembangunan Jalan Dusun Selorejo Sel...</td>
                <td className="py-4 px-6 text-gray-500">Pembangunan</td>
                <td className="py-4 px-6 text-gray-400 text-xs">8 Sep 2026</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-[10px]">Published</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openModal("Edit")} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                    <button className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-gray-400">2</td>
                <td className="py-4 px-6">
                  <div className="w-12 h-8 bg-gray-200 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=100&q=80" alt="thumb" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-gray-800">Posyandu Rutin Bulan September 2026</td>
                <td className="py-4 px-6 text-gray-500">Kesehatan</td>
                <td className="py-4 px-6 text-gray-400 text-xs">7 Sep 2026</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-[10px]">Published</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openModal("Edit")} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                    <button className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-gray-400">3</td>
                <td className="py-4 px-6">
                  <div className="w-12 h-8 bg-gray-200 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=100&q=80" alt="thumb" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-gray-800">Festival Panen Raya 2026 Desa Selorejo</td>
                <td className="py-4 px-6 text-gray-500">Budaya</td>
                <td className="py-4 px-6 text-gray-400 text-xs">5 Sep 2026</td>
                <td className="py-4 px-6">
                  <span className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-full text-[10px]">Draft</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openModal("Edit")} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                    <button className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#1e3f20] text-white text-xs font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 text-xs font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 text-xs font-medium transition-colors">3</button>
          </div>
        </div>
      </div>

      {/* MODAL POP-UP (TAMBAH / EDIT BERITA) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl z-10 mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">{modalType} Berita</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Berita</label>
                <input type="text" defaultValue={modalType === "Edit" ? "Pembangunan Jalan Dusun Selorejo Selesai" : ""} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" placeholder="Masukkan judul berita" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]">
                  <option>Pembangunan</option>
                  <option>Kesehatan</option>
                  <option>Budaya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Foto / Thumbnail Berita</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
                   <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 border border-gray-200 rounded px-3 py-1.5 bg-white shadow-sm">Pilih Foto</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Isi Berita</label>
                <textarea className="w-full p-4 h-32 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20] resize-none" placeholder="Tulis isi berita di sini..."></textarea>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-gray-700">Status:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3f20]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">Published</span>
                </label>
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