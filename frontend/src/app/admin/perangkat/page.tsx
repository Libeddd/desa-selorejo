"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  adminGetOfficials, 
  adminCreateOfficial, 
  adminUpdateOfficial, 
  adminDeleteOfficial,
  uploadImage,
  deleteImage
} from "@/lib/database";
import { toast } from "@/components/Toast";
import type { VillageOfficial } from "@/types";

export default function AdminPerangkatPage() {
  const [officials, setOfficials] = useState<VillageOfficial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Tambah" | "Edit">("Tambah");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [nip, setNip] = useState("");
  const [nipError, setNipError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    setIsLoading(true);
    const data = await adminGetOfficials();
    setOfficials(data);
    setIsLoading(false);
  };

  const filteredOfficials = useMemo(() => {
    if (!searchQuery) return officials;
    return officials.filter(o =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [officials, searchQuery]);

  const openModal = (type: "Tambah" | "Edit", official?: VillageOfficial) => {
    setModalType(type);
    setNipError("");
    if (type === "Edit" && official) {
      setSelectedId(official.id);
      setName(official.name);
      setPosition(official.position);
      setNip(official.nip || "");
      setIsActive(official.is_active);
      setSortOrder(official.sort_order);
      setPhotoUrl(official.photo_url);
      setImageFile(null);
    } else {
      setSelectedId(null);
      setName("");
      setPosition("");
      setNip("");
      setIsActive(true);
      setSortOrder(officials.length + 1);
      setPhotoUrl(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleNipChange = (val: string) => {
    // NIP hanya boleh angka
    if (val && !/^\d+$/.test(val)) {
      setNipError("NIP hanya boleh berisi angka");
    } else {
      setNipError("");
    }
    setNip(val.replace(/\D/g, "")); // Hapus non-angka otomatis
  };

  const handleSubmit = async () => {
    if (!name.trim()) { toast("Nama perangkat wajib diisi!", "error"); return; }
    if (!position.trim()) { toast("Jabatan wajib diisi!", "error"); return; }
    if (nipError) { toast("Perbaiki kesalahan pada form terlebih dahulu!", "error"); return; }

    setIsSaving(true);
    try {
      let finalPhotoUrl = photoUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, 'officials');
        if (uploadedUrl) finalPhotoUrl = uploadedUrl;
      }

      const payload: Partial<VillageOfficial> = {
        name: name.trim(),
        position: position.trim(),
        nip: nip || null,
        is_active: isActive,
        sort_order: sortOrder,
        photo_url: finalPhotoUrl,
      };

      if (modalType === "Tambah") {
        const { error } = await adminCreateOfficial(payload);
        if (error) { toast(`Gagal menyimpan: ${error.message}`, "error"); return; }
        toast("Perangkat desa berhasil ditambahkan! ✓");
      } else if (modalType === "Edit" && selectedId) {
        const { error } = await adminUpdateOfficial(selectedId, payload);
        if (error) { toast(`Gagal memperbarui: ${error.message}`, "error"); return; }
        toast("Data perangkat berhasil diperbarui! ✓");
      }

      setIsModalOpen(false);
      fetchOfficials();
    } catch (error) {
      console.error("Gagal menyimpan data perangkat:", error);
      toast("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, photoUrlToDelete?: string | null) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data perangkat ini? Tindakan ini tidak bisa dibatalkan.")) return;
    try {
      const { error } = await adminDeleteOfficial(id);
      if (error) { toast(`Gagal menghapus: ${error.message}`, "error"); return; }
      if (photoUrlToDelete) await deleteImage(photoUrlToDelete);
      toast("Data perangkat berhasil dihapus.");
      fetchOfficials();
    } catch (err) {
      console.error(err);
      toast("Terjadi kesalahan saat menghapus data.", "error");
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau jabatan..."
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
          />
        </div>
        <button onClick={() => openModal("Tambah")} className="w-full md:w-auto bg-[#1e3f20] hover:bg-[#152e17] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          + Tambah Perangkat
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">No</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Foto</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Nama</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Jabatan</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 align-middle">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Memuat data...</td></tr>
              ) : filteredOfficials.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">
                  {searchQuery ? "Tidak ada hasil yang cocok." : "Belum ada data perangkat desa."}
                </td></tr>
              ) : (
                filteredOfficials.map((official) => (
                  <tr key={official.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-400">{official.sort_order}</td>
                    <td className="py-4 px-6">
                      {official.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={official.photo_url} alt={official.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#1e3f20]/10 flex items-center justify-center text-[#1e3f20] font-bold text-sm">
                          {official.name[0]}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {official.name}
                      {official.nip && <div className="text-xs text-gray-400 font-normal">NIP: {official.nip}</div>}
                    </td>
                    <td className="py-4 px-6 text-gray-500">{official.position}</td>
                    <td className="py-4 px-6">
                      {official.is_active ? (
                        <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-[10px]">Aktif</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-full text-[10px]">Nonaktif</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal("Edit", official)} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                        <button onClick={() => handleDelete(official.id, official.photo_url)} className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
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
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                  placeholder="Masukkan nama lengkap" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">NIP (Opsional, angka saja)</label>
                <input 
                  type="text" value={nip}
                  onChange={(e) => handleNipChange(e.target.value)}
                  inputMode="numeric"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20] ${nipError ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                  placeholder="Masukkan NIP jika ada (hanya angka)" 
                />
                {nipError && <p className="text-xs text-red-500 mt-1">{nipError}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Jabatan *</label>
                <input 
                  type="text" value={position} onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                  placeholder="Misal: Kepala Desa, Sekretaris Desa" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Foto</label>
                <input 
                  type="file" accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Urutan (Sort)</label>
                  <input 
                    type="number" value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                    min={1}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Status Aktif</label>
                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3f20]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{isActive ? 'Aktif' : 'Nonaktif'}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
              <button onClick={handleSubmit} disabled={isSaving} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1e3f20] hover:bg-[#152e17] rounded-xl transition-colors shadow-sm disabled:opacity-50">
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}