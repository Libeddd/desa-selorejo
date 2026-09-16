"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  adminGetAllNews, 
  adminCreateNews, 
  adminUpdateNews, 
  adminDeleteNews,
  uploadImage,
  deleteImage
} from "@/lib/database";
import { toast } from "@/components/Toast";
import type { News } from "@/types";

type FilterStatus = "Semua" | "Published" | "Draft";

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Tambah" | "Edit">("Tambah");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("Semua");

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"berita" | "pengumuman" | "kegiatan" | "informasi">("berita");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    const data = await adminGetAllNews();
    setNewsList(data);
    setIsLoading(false);
  };

  // Filter & Search di sisi klien
  const filteredNews = useMemo(() => {
    return newsList.filter((news) => {
      const matchSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        filterStatus === "Semua" ||
        (filterStatus === "Published" && news.is_published) ||
        (filterStatus === "Draft" && !news.is_published);
      return matchSearch && matchStatus;
    });
  }, [newsList, searchQuery, filterStatus]);

  const openModal = (type: "Tambah" | "Edit", news?: News) => {
    setModalType(type);
    if (type === "Edit" && news) {
      setSelectedId(news.id);
      setTitle(news.title);
      setCategory(news.category);
      setContent(news.content);
      setIsPublished(news.is_published);
      setCoverImageUrl(news.cover_image_url);
      setImageFile(null);
    } else {
      setSelectedId(null);
      setTitle("");
      setCategory("berita");
      setContent("");
      setIsPublished(true);
      setCoverImageUrl(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async () => {
    if (!title.trim()) { toast("Judul berita wajib diisi!", "error"); return; }
    if (!content.trim()) { toast("Isi berita wajib diisi!", "error"); return; }

    setIsSaving(true);
    try {
      let finalImageUrl = coverImageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, 'news');
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const payload: Partial<News> = {
        title: title.trim(),
        slug: generateSlug(title),
        category,
        content: content.trim(),
        excerpt: content.substring(0, 150) + "...",
        is_published: isPublished,
        cover_image_url: finalImageUrl,
        published_at: isPublished ? new Date().toISOString() : null,
      };

      if (modalType === "Tambah") {
        const { error } = await adminCreateNews(payload);
        if (error) { toast(`Gagal menyimpan: ${error.message}`, "error"); return; }
        toast("Berita berhasil ditambahkan! ✓");
      } else if (modalType === "Edit" && selectedId) {
        const { error } = await adminUpdateNews(selectedId, payload);
        if (error) { toast(`Gagal memperbarui: ${error.message}`, "error"); return; }
        toast("Berita berhasil diperbarui! ✓");
      }

      setIsModalOpen(false);
      fetchNews();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
      toast("Terjadi kesalahan saat menyimpan berita.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, imageUrl?: string | null) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak bisa dibatalkan.")) return;
    try {
      const { error } = await adminDeleteNews(id);
      if (error) {
        toast(`Gagal menghapus: ${error.message}`, "error");
        return;
      }
      if (imageUrl) await deleteImage(imageUrl);
      toast("Berita berhasil dihapus.");
      fetchNews();
    } catch (err) {
      console.error(err);
      toast("Terjadi kesalahan saat menghapus berita.", "error");
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul berita..." 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="bg-white border border-gray-200 text-gray-600 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#1e3f20] min-w-[120px]"
          >
            <option value="Semua">Semua</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
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
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Memuat data...</td></tr>
              ) : filteredNews.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">
                  {searchQuery || filterStatus !== "Semua" ? "Tidak ada berita yang sesuai filter." : "Belum ada berita."}
                </td></tr>
              ) : (
                filteredNews.map((news, index) => (
                  <tr key={news.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-400">{index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="w-12 h-8 bg-gray-200 rounded overflow-hidden">
                        {news.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={news.cover_image_url} alt="thumb" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-300"></div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[200px] truncate">{news.title}</td>
                    <td className="py-4 px-6 text-gray-500 capitalize">{news.category}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6">
                      {news.is_published ? (
                        <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-[10px]">Published</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-full text-[10px]">Draft</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal("Edit", news)} className="border border-gray-200 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Edit</button>
                        <button onClick={() => handleDelete(news.id, news.cover_image_url)} className="border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors">
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
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl z-10 mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">{modalType} Berita</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Berita *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]" 
                  placeholder="Masukkan judul berita" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20]"
                >
                  <option value="berita">Berita</option>
                  <option value="pengumuman">Pengumuman</option>
                  <option value="kegiatan">Kegiatan</option>
                  <option value="informasi">Informasi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Foto / Thumbnail Berita</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {(coverImageUrl || imageFile) && (
                  <div className="text-xs text-gray-500">* Gambar akan diperbarui jika file baru dipilih.</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Isi Berita *</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 h-40 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3f20] resize-y" 
                  placeholder="Tulis isi berita di sini..."
                ></textarea>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-gray-700">Status:</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3f20]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">{isPublished ? 'Published' : 'Draft'}</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
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