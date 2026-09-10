"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { adminGetAllNews } from "@/lib/database";
import type { News } from "@/types";

interface DashboardStats {
  totalBerita: number;
  totalUmkm: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalBerita: 0, totalUmkm: 0 });
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Ambil email user yang login
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) setUserEmail(session.user.email);

      // Ambil jumlah berita
      const { count: newsCount } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true });

      // Ambil jumlah UMKM
      const { count: umkmCount } = await supabase
        .from("umkm_stores")
        .select("*", { count: "exact", head: true });

      // Ambil 5 berita terbaru
      const allNews = await adminGetAllNews();
      
      setStats({
        totalBerita: newsCount ?? 0,
        totalUmkm: umkmCount ?? 0,
      });
      setRecentNews(allNews.slice(0, 5));
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = userEmail ? userEmail.split("@")[0] : "Admin";

  return (
    <div className="animate-in fade-in duration-300">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
          Selamat datang, {displayName} <span className="text-2xl">👋</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">Berikut adalah ringkasan data Desa Selorejo hari ini.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Total Berita */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-indigo-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">
              {isLoading ? <span className="animate-pulse">...</span> : stats.totalBerita}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Berita</p>
          </div>
        </div>

        {/* Card 2: Jumlah UMKM */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-cyan-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">
              {isLoading ? <span className="animate-pulse">...</span> : stats.totalUmkm}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Jumlah UMKM</p>
          </div>
        </div>
      </div>

      {/* Tabel Berita Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden pb-10">
        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm">Berita Terbaru</h3>
          <Link href="/admin/berita" className="text-xs text-gray-400 hover:text-gray-800">Lihat Semua &rarr;</Link>
        </div>
        <div className="p-5 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-8 text-gray-400 text-sm">Memuat data...</div>
          ) : recentNews.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Belum ada berita. Tambahkan berita pertama Anda!</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider w-2/5">Judul</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kategori</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Status</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Tanggal</th>
                  <th className="pb-3 text-[10px] uppercase text-gray-400 font-semibold tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600 align-middle">
                {recentNews.map((news) => (
                  <tr key={news.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 font-medium text-gray-800 pr-4 truncate max-w-[200px]">{news.title}</td>
                    <td className="py-4 text-gray-500 capitalize">{news.category}</td>
                    <td className="py-4">
                      {news.is_published
                        ? <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full text-[10px]">Published</span>
                        : <span className="bg-gray-100 text-gray-500 font-bold px-2.5 py-1 rounded-full text-[10px]">Draft</span>
                      }
                    </td>
                    <td className="py-4 text-gray-400">
                      {new Date(news.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-4 text-center">
                      <Link href="/admin/berita" className="border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 px-3 py-1 rounded text-[10px] font-medium transition-colors">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}