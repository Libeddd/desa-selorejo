"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPendudukPage() {
  const [dusunSelorejo, setDusunSelorejo] = useState("1284");
  const [dusunDongol, setDusunDongol] = useState("1120");
  const [dusunPonggok, setDusunPonggok] = useState("880");

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan data penduduk berhasil disimpan!");
  };

  const totalPenduduk = parseInt(dusunSelorejo) + parseInt(dusunDongol) + parseInt(dusunPonggok);

  return (
    <div className="animate-in fade-in duration-300">
      {/* Top Cards (Total Penduduk & Jumlah KK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative h-36">
          <div className="flex justify-between items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{totalPenduduk.toLocaleString('id-ID')}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Penduduk</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative h-36">
          <div className="flex justify-between items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">924</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Jumlah KK</p>
          </div>
        </div>
      </div>

      {/* Form Update Data Penduduk */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Update Data Penduduk</h3>
        <form onSubmit={handleSimpan}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Dusun Selorejo</label>
              <input type="number" value={dusunSelorejo} onChange={(e) => setDusunSelorejo(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Dusun Dongol</label>
              <input type="number" value={dusunDongol} onChange={(e) => setDusunDongol(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Dusun Ponggok</label>
              <input type="number" value={dusunPonggok} onChange={(e) => setDusunPonggok(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" />
            </div>
          </div>
          <button type="submit" className="bg-[#1e3f20] hover:bg-[#152e17] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">Simpan Perubahan</button>
        </form>
      </div>

      {/* Sebaran Penduduk (Donut Chart & Legend) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center mb-10">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold text-gray-800 mb-8">Sebaran Penduduk per Dusun</h3>
          <div className="flex justify-center md:justify-start pl-4">
            <div className="w-40 h-40 rounded-full relative flex items-center justify-center shadow-inner" style={{ background: "conic-gradient(#1e3f20 0% 39%, #7b9c7b 39% 73%, #d4a373 73% 100%)" }}>
              <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                <span className="text-lg font-bold text-gray-800">{totalPenduduk.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-gray-500 font-medium">Jiwa</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4 mt-6 md:mt-12 justify-center">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-sm bg-[#1e3f20] mt-1"></div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-none">Dusun Selorejo</p>
              <p className="text-xs text-gray-500 mt-1">{dusunSelorejo} jiwa (39%)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-sm bg-[#7b9c7b] mt-1"></div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-none">Dusun Dongol</p>
              <p className="text-xs text-gray-500 mt-1">{dusunDongol} jiwa (34%)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-sm bg-[#d4a373] mt-1"></div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-none">Dusun Ponggok</p>
              <p className="text-xs text-gray-500 mt-1">{dusunPonggok} jiwa (27%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}