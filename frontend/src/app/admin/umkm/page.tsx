"use client";

import { useState, useEffect } from "react";
import { 
  adminGetAllUmkm, 
  adminCreateUmkm, 
  adminUpdateUmkm, 
  adminDeleteUmkm,
  uploadImage
} from "@/lib/database";
import type { UmkmStore } from "@/types";

export default function AdminUmkmPage() {
  const [umkmList, setUmkmList] = useState<UmkmStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Tambah" | "Edit">("Tambah");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [category, setCategory] = useState("Makanan");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUmkm();
  }, []);

  const fetchUmkm = async () => {
    setIsLoading(true);
    const data = await adminGetAllUmkm();
    setUmkmList(data);
    setIsLoading(false);
  };

  const openModal = (type: "Tambah" | "Edit", umkm?: UmkmStore) => {
    setModalType(type);
    if (type === "Edit" && umkm) {
      setSelectedId(umkm.id);
      setName(umkm.name);
      setOwnerName(umkm.owner_name);
      setCategory(umkm.category || "Makanan");
      setDescription(umkm.description || "");
      setAddress(umkm.address || "");
      setWhatsapp(umkm.whatsapp || "");
      setIsActive(umkm.is_active ?? true);
      setIsFeatured(umkm.is_featured ?? false);
      setCoverImageUrl(umkm.cover_image_url);
      setImageFile(null);
    } else {
      setSelectedId(null);
      setName("");
      setOwnerName("");
      setCategory("Makanan");
      setDescription("");
      setAddress("");
      setWhatsapp("");
      setIsActive(true);
      setIsFeatured(false);
      setCoverImageUrl(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async () => {
    if (!name || !ownerName) {
      alert("Nama UMKM dan Nama Pemilik wajib diisi!");
      return;
    }

    setIsSaving(true);
    try {
      let finalImageUrl = coverImageUrl;

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, 'umkm');
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const payload: Partial<UmkmStore> = {
        name,
        slug: generateSlug(name),
        owner_name: ownerName,
        category,
        description,
        address,
        whatsapp,
        is_active: isActive,
        is_featured: isFeatured,
        cover_image_url: finalImageUrl,
      };

      if (modalType === "Tambah") {
        await adminCreateUmkm(payload);
      } else if (modalType === "Edit" && selectedId) {
        await adminUpdateUmkm(selectedId, payload);
      }

      setIsModalOpen(false);
      fetchUmkm();
    } catch (error) {
      console.error("Gagal menyimpan data UMKM:", error);
      alert("Terjadi kesalahan saat menyimpan data UMKM.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data UMKM ini?")) {
      await adminDeleteUmkm(id);
      fetchUmkm();
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Cari nama UMKM..." 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => openModal("Tambah")}
            className="bg-[#1e3f20] hover:bg-[#152e17] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            + Tambah UMKM
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
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Foto</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Nama UMKM</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Pemilik</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kategori</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 align-middle">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">Memuat data...</td>
                </tr>
              ) : umkmList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">Belum ada data UMKM.</td>
                </tr>
              ) : (
                umkmList.map((umkm, index) => (
                  <tr key={umkm.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-400">{index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                        {umkm.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={umkm.cover_image_url} alt="thumb" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-300"></div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {umkm.name}
                      {umkm.is_featured && <span className="ml-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold">Unggulan</span>}
                    </td>
                    <td className="py-4 px-6 text-gray-500">{umkm.owner_name}</td>
                    <td className="py-4 px-6 text-gray-500">{umkm.category}</td>
                    <td className="py-4 px-6">
                      {umkm.is_active ? (
                        <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-[10px]">Aktif</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-full text-[10px]">Nonaktif</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal("Edit", umkm)} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                        <button onClick={() => handleDelete(umkm.id)} className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
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

      {/* MODAL POP-UP (TAMBAH / EDIT UMKM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl z-10 mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">{modalType} UMKM</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama UMKM</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                    placeholder="Masukkan nama UMKM" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Pemilik</label>
                  <input 
                    type="text" 
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                    placeholder="Masukkan nama pemilik" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
                  >
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Pakaian">Pakaian</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">WhatsApp (Opsional)</label>
                  <input 
                    type="text" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                    placeholder="081234567890" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat / Lokasi</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                  placeholder="Masukkan alamat UMKM" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Foto Produk / UMKM</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {(coverImageUrl || imageFile) && (
                  <div className="text-xs text-gray-500">
                    * Gambar akan diperbarui jika file baru dipilih.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 h-24 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20] resize-y" 
                  placeholder="Jelaskan produk atau jasa yang ditawarkan..."
                ></textarea>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-bold text-gray-700">Status:</label>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3f20]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{isActive ? 'Aktif' : 'Nonaktif'}</span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-bold text-gray-700">Tampilkan di Beranda (Unggulan):</label>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{isFeatured ? 'Ya' : 'Tidak'}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1e3f20] hover:bg-[#152e17] rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
