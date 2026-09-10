"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle Tampilkan/Sembunyikan password
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // ==========================================
    // LOGIKA LOGIN SEMENTARA (HARDCODED)
    // Email saya sesuaikan dengan placeholder di gambar Anda
    // ==========================================
    const dummyEmail = "admin@selorejo.desa.id"; 
    const dummyPassword = "admin123";

    if (email === dummyEmail && password === dummyPassword) {
      document.cookie = "admin_session=true; path=/";
      router.push("/admin"); 
    } else {
      setErrorMsg("Email atau password salah! Silakan coba lagi.");
    }
  };

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-cover bg-center"
      // Gambar background sementara (Anda bisa menggantinya dengan foto asli Desa Selorejo nanti)
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')" }}
    >
      {/* Overlay gradient hijau gelap ala gambar */}
      <div className="absolute inset-0 bg-[#1e3f20]/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Konten Utama */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Teks Judul Atas (Sesuai request: Tanpa Logo Bulat DS) */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">
            Desa Selorejo
          </h1>
          <p className="text-white/80 text-sm tracking-wide drop-shadow-sm">
            Panel Admin Desa
          </p>
        </div>

        {/* Box Form Login */}
        <div className="w-full bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          
          <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-800 text-center mb-8">
            Masuk ke Dashboard
          </h2>

          {/* Notifikasi Error */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                Username / Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all text-sm focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                placeholder="admin@selorejo.desa.id"
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-24 py-3 rounded-xl border border-gray-200 outline-none transition-all text-sm focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-500 hover:text-gray-800 transition-colors bg-white px-1"
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg mt-4 text-sm"
              style={{ background: "var(--dark-green, #1e3f20)" }}
            >
              Masuk
            </button>
          </form>

          {/* Lupa Password */}
          <div className="mt-6 text-center">
            <Link 
              href="#" 
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-4"
            >
              Lupa Password?
            </Link>
          </div>

        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-center z-10 w-full">
        <p className="text-[10px] text-white/50 tracking-wider">
          © 2026 Desa Selorejo - Kab. Blitar
        </p>
      </div>
    </main>
  );
}