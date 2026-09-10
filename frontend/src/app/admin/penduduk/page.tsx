"use client";

import { useState, useEffect } from "react";
import { getVillageInfo, adminUpdateVillageInfo } from "@/lib/database";

export default function AdminPendudukPage() {
  const [totalPenduduk, setTotalPenduduk] = useState<number>(0);
  const [totalKk, setTotalKk] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getVillageInfo();
    if (data) {
      setTotalPenduduk(data.total_penduduk || 0);
      setTotalKk(data.total_kk || 0);
    }
    setIsLoading(false);
  };

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await adminUpdateVillageInfo({
        total_penduduk: totalPenduduk,
        total_kk: totalKk
      });
      alert("Perubahan data penduduk berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  }

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
            <h3 className="text-3xl font-bold text-gray-800">{totalKk.toLocaleString('id-ID')}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Jumlah KK</p>
          </div>
        </div>
      </div>

      {/* Form Update Data Penduduk */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Update Data Penduduk</h3>
        <form onSubmit={handleSimpan}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Penduduk (Jiwa)</label>
              <input 
                type="number" 
                value={totalPenduduk} 
                onChange={(e) => setTotalPenduduk(parseInt(e.target.value) || 0)} 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Kepala Keluarga (KK)</label>
              <input 
                type="number" 
                value={totalKk} 
                onChange={(e) => setTotalKk(parseInt(e.target.value) || 0)} 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-[#1e3f20] hover:bg-[#152e17] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>

      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm mb-10 flex gap-3 items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <p>Data total penduduk dan KK ini akan ditampilkan di halaman depan (Home) pada bagian Statistik Desa.</p>
      </div>
    </div>
  );
}