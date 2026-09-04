"use client";

import { useState, useEffect, useRef } from "react";

const DESA_NAME = "Selorejo";
const KECAMATAN = "Kawedanan";
const KABUPATEN = "Magetan";
const PROVINSI = "Jawa Timur";

// ─── Icons ──────────────────────────────────────────────────────────────────

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.48 2 2 0 0 1 3.59 2.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconWhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconYoutube({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Beranda", "Tentang Desa", "UMKM", "Perangkat Desa", "Kontak"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(248,247,242,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(35,69,44,0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(216,203,168,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button onClick={() => scrollTo("beranda")} className="flex items-center gap-3 group">
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold block"
            style={{ background: "var(--dark-green)" }}
          >
            DS
          </span>
          <span className="text-left block">
            <span
              className="font-serif font-semibold text-base leading-tight block"
              style={{ color: scrolled ? "var(--dark-green)" : "#fff" }}
            >
              Desa {DESA_NAME}
            </span>
            <span
              className="text-xs leading-none block"
              style={{ color: scrolled ? "var(--sage-green)" : "rgba(255,255,255,0.75)" }}
            >
              {KECAMATAN} · {KABUPATEN}
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ color: scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.9)" }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 transition-opacity hover:opacity-70"
          style={{ color: scrolled ? "var(--dark-green)" : "#fff" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-6"
          style={{
            background: "rgba(248,247,242,0.98)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(216,203,168,0.4)",
            boxShadow: "0 8px 30px rgba(35,69,44,0.1)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="block w-full text-left py-3 text-sm font-medium border-b last:border-b-0"
              style={{ color: "var(--charcoal)", borderColor: "rgba(216,203,168,0.4)" }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="beranda"
      className="relative w-full min-h-screen flex items-center"
      style={{ background: "var(--dark-green)" }}
    >
      <img
        src="https://images.unsplash.com/photo-1786882546676-835df9107c1d?w=1600&h=900&fit=crop&auto=format"
        alt="Lanskap Desa Sumbermulyo yang hijau dan asri"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(32,37,32,0.78) 0%, rgba(32,37,32,0.45) 55%, rgba(32,37,32,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(32,37,32,0.5) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-px w-10"
              style={{ background: "var(--beige)" }}
            />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--beige)" }}
            >
              {KECAMATAN} · {KABUPATEN} · {PROVINSI}
            </span>
          </div>

          <p className="text-white/80 text-lg mb-3 font-light">Selamat Datang di</p>
          <h1
            className="font-serif font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "#fff",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Desa<br />{DESA_NAME}
          </h1>

          <p
            className="text-base lg:text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Desa mandiri, berdaya, dan sejahtera. Bersama membangun masa depan yang lebih baik melalui potensi alam, budaya, dan kearifan lokal.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--dark-green)",
                color: "#fff",
                border: "2px solid var(--dark-green)",
                boxShadow: "0 4px 20px rgba(35,69,44,0.4)",
              }}
              onClick={() => document.getElementById("potensi-desa")?.scrollIntoView({ behavior: "smooth" })}
            >
              Jelajahi Desa <IconArrowRight />
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.6)",
              }}
              onClick={() => document.getElementById("tentang-desa")?.scrollIntoView({ behavior: "smooth" })}
            >
              Tentang Desa
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}

// ─── Sambutan Kepala Desa ───────────────────────────────────────────────────

function SambutanKepalaDesa() {
  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--beige-light)" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div
          className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-center p-7 lg:p-10 rounded-2xl"
          style={{
            background: "var(--off-white)",
            border: "1px solid rgba(216,203,168,0.7)",
            boxShadow: "0 12px 35px rgba(35,69,44,0.08)",
          }}
        >
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=520&h=640&fit=crop&auto=format"
              alt="Foto Kepala Desa Selorejo"
              className="w-44 h-52 lg:w-56 lg:h-64 object-cover rounded-xl mx-auto"
              style={{ boxShadow: "0 10px 25px rgba(35,69,44,0.16)" }}
            />
            <p className="font-serif font-semibold text-lg mt-4" style={{ color: "var(--dark-green)" }}>
              Bapak JUMADI
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--sage-green)" }}>
              Kepala Desa {DESA_NAME}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "var(--sage-green)" }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--sage-green)" }}
              >
                Sambutan Kepala Desa
              </span>
            </div>
            <h2
              className="font-serif font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--charcoal)" }}
            >
              Selamat Datang di Desa {DESA_NAME}
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(32,37,32,0.75)" }}>
              Assalamu&apos;alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi Desa {DESA_NAME}.
              Website ini hadir sebagai ruang informasi dan pelayanan bagi seluruh masyarakat.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(32,37,32,0.75)" }}>
              Mari bersama-sama menjaga semangat gotong royong, mengembangkan potensi desa, dan mewujudkan
              Desa {DESA_NAME} yang maju, mandiri, serta sejahtera. Wassalamu&apos;alaikum warahmatullahi wabarakatuh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────

const STATS = [
  { icon: "👥", value: "1.245", label: "Penduduk", sublabel: "Jiwa" },
  { icon: "🗺️", value: "320", label: "Luas Wilayah", sublabel: "Hektare" },
  { icon: "🏘️", value: "3", label: "Dusun", sublabel: "Wilayah" },
  { icon: "🛒", value: "15", label: "UMKM", sublabel: "Aktif" },
];

function Stats() {
  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--beige)" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
              style={{ background: "var(--off-white)" }}
            >
              <span className="text-3xl mb-3">{s.icon}</span>
              <span
                className="font-serif font-bold leading-none mb-1"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--dark-green)" }}
              >
                {s.value}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--charcoal)" }}>
                {s.label}
              </span>
              <span className="text-xs mt-0.5" style={{ color: "var(--sage-green)" }}>
                {s.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

const ABOUT_INFO = [
  { label: "Lokasi", value: `Desa ${DESA_NAME}` },
  { label: "Kecamatan", value: KECAMATAN },
  { label: "Kabupaten", value: KABUPATEN },
  { label: "Provinsi", value: PROVINSI },
  { label: "Luas Wilayah", value: "320 Hektare" },
  { label: "Jumlah Dusun", value: "3 Dusun" },
];

function About() {
  return (
    <section id="tentang-desa" className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "var(--sage-green)" }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--sage-green)" }}
              >
                Profil Desa
              </span>
            </div>
            <h2
              className="font-serif font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--charcoal)" }}
            >
              Tentang Desa<br />{DESA_NAME}
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(32,37,32,0.75)" }}>
              Desa {DESA_NAME} adalah desa yang terletak di Kecamatan {KECAMATAN}, Kabupaten {KABUPATEN}, Daerah Istimewa Yogyakarta. Desa ini dikenal dengan keindahan alamnya yang asri, kekayaan budaya lokal, serta potensi pertanian dan perkebunan yang melimpah.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(32,37,32,0.75)" }}>
              Dengan semangat gotong royong dan kepemimpinan yang visioner, Desa {DESA_NAME} terus berkembang menjadi desa mandiri yang mampu memberdayakan seluruh potensi masyarakatnya menuju kehidupan yang lebih sejahtera.
            </p>

            {/* Info grid */}
            <div
              className="grid grid-cols-2 gap-0 mb-8 rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--beige)" }}
            >
              {ABOUT_INFO.map((item, i) => (
                <div
                  key={item.label}
                  className="px-5 py-3.5"
                  style={{
                    borderBottom: i < ABOUT_INFO.length - 2 ? `1px solid var(--beige)` : "none",
                    borderRight: i % 2 === 0 ? `1px solid var(--beige)` : "none",
                    background: i % 4 < 2 ? "rgba(216,203,168,0.12)" : "transparent",
                  }}
                >
                  <div className="text-xs font-medium mb-0.5" style={{ color: "var(--sage-green)" }}>
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "var(--charcoal)" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "2px solid var(--dark-green)",
                color: "var(--dark-green)",
                background: "transparent",
              }}
            >
              Selengkapnya
            </button>
          </div>

          {/* Right – photo */}
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
              style={{ background: "var(--beige)", opacity: 0.4 }}
            />
            <img
              src="https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=600&fit=crop&auto=format"
              alt="Pemandangan aerial Desa Sumbermulyo yang indah"
              className="relative w-full aspect-[4/3] object-cover rounded-2xl"
              style={{ boxShadow: "0 20px 60px rgba(35,69,44,0.2)" }}
            />
            <div
              className="absolute bottom-6 left-6 right-6 py-4 px-5 rounded-xl"
              style={{
                background: "rgba(248,247,242,0.95)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div className="font-serif font-semibold text-base" style={{ color: "var(--dark-green)" }}>
                Desa {DESA_NAME}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--sage-green)" }}>
                {KECAMATAN}, {KABUPATEN}, {PROVINSI}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Potensi ─────────────────────────────────────────────────────────────────

const POTENSI = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M24 8C24 8 12 16 12 28a12 12 0 0 0 24 0C36 16 24 8 24 8z" />
        <path d="M24 28v8M20 24l4 4 4-4" />
      </svg>
    ),
    title: "Pertanian",
    desc: "Lahan pertanian produktif dengan hasil padi, sayuran, dan tanaman pangan unggulan yang menjadi tumpuan ekonomi warga.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="24" cy="20" r="8" /><path d="M24 28v12" /><path d="M16 36h16" /><path d="M12 16c2-4 6-6 12-6M36 16c-2-4-6-6-12-6" />
      </svg>
    ),
    title: "Perkebunan",
    desc: "Perkebunan kelapa, pisang, dan kopi yang dikelola secara tradisional menghasilkan produk berkualitas tinggi.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <ellipse cx="24" cy="30" rx="12" ry="6" /><path d="M12 30c0-8 4-16 12-18 8 2 12 10 12 18" /><path d="M20 20c-2 2-3 5-3 8M28 20c2 2 3 5 3 8" />
      </svg>
    ),
    title: "Peternakan",
    desc: "Budidaya sapi, kambing, dan unggas yang dikelola kelompok tani ternak, mendukung ketahanan pangan lokal.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M8 36l8-8 6 4 8-10 6 6" /><rect x="6" y="10" width="36" height="26" rx="3" /><path d="M14 10V8M24 10V8M34 10V8" />
      </svg>
    ),
    title: "Pariwisata",
    desc: "Wisata alam sawah hijau, kolam renang alami, dan tur budaya lokal yang menarik minat wisatawan dari berbagai daerah.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M10 38V20l14-10 14 10v18" /><rect x="18" y="26" width="12" height="12" /><path d="M18 26v-6a6 6 0 0 1 12 0v6" />
      </svg>
    ),
    title: "Kerajinan",
    desc: "Anyaman bambu, gerabah, dan batik tulis karya pengrajin lokal yang kaya nilai seni dan kearifan budaya Jawa.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 34l6-6 4 4 6-8 4 4" /><circle cx="36" cy="14" r="4" /><path d="M8 40h32M8 8h20" /><path d="M8 16h14M8 24h10" />
      </svg>
    ),
    title: "Ekonomi Kreatif",
    desc: "Pengolahan makanan tradisional, desain produk lokal, dan pemasaran digital yang memperluas pasar UMKM desa.",
  },
];

function Potensi() {
  return (
    <section
      id="potensi-desa"
      className="py-20 lg:py-28"
      style={{ background: "var(--beige-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "var(--sage-green)" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--sage-green)" }}
            >
              Unggulan
            </span>
          </div>
          <h2
            className="font-serif font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", color: "var(--charcoal)" }}
          >
            Potensi Desa {DESA_NAME}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POTENSI.map((item) => (
            <div
              key={item.title}
              className="group p-7 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: "var(--off-white)",
                boxShadow: "0 2px 12px rgba(35,69,44,0.06)",
                border: "1px solid rgba(216,203,168,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(35,69,44,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(35,69,44,0.06)";
              }}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-5"
                style={{ background: "rgba(35,69,44,0.07)", color: "var(--dark-green)" }}
              >
                {item.icon}
              </div>
              <h3
                className="font-serif font-semibold text-xl mb-3"
                style={{ color: "var(--charcoal)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(32,37,32,0.68)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── UMKM ────────────────────────────────────────────────────────────────────

type Umkm = {
  id: number;
  name: string;
  category: string;
  desc: string;
  owner: string;
  location: string;
  img: string;
  phone: string;
  instagram: string;
  hours: string;
  products: string;
  address: string;
  fullDesc: string;
};

const UMKM_DATA: Umkm[] = [
  {
    id: 1,
    name: "Keripik Pisang Bu Siti",
    category: "Makanan",
    desc: "Keripik pisang renyah dengan berbagai varian rasa, dibuat dari pisang pilihan kebun sendiri.",
    owner: "Siti Rahayu",
    location: "Dusun Krajan",
    img: "https://images.unsplash.com/photo-1775377262418-24c4d1c89574?w=600&h=400&fit=crop&auto=format",
    phone: "628123456789",
    instagram: "keripik_busiti",
    hours: "08.00 – 17.00 WIB",
    products: "Keripik Pisang Original, Balado, Coklat, Keju",
    address: "Dusun Krajan RT 02, Desa Sumbermulyo",
    fullDesc:
      "Keripik Pisang Bu Siti adalah usaha rumahan yang telah berdiri sejak 2015. Menggunakan pisang kepok pilihan dari kebun sendiri, setiap keripik diproses secara higienis dengan minyak kelapa murni. Tersedia dalam varian original, balado pedas, coklat, dan keju yang cocok untuk camilan maupun oleh-oleh.",
  },
  {
    id: 2,
    name: "Kopi Desa Sumbermulyo",
    category: "Minuman",
    desc: "Kopi arabika dan robusta pilihan dari perkebunan lokal, diolah secara tradisional dengan cita rasa autentik.",
    owner: "Bambang Suryanto",
    location: "Dusun Ngemplak",
    img: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=600&h=400&fit=crop&auto=format",
    phone: "628234567890",
    instagram: "kopi_desa_sumbermulyo",
    hours: "07.00 – 20.00 WIB",
    products: "Arabika Giling, Robusta Sangrai, Cold Brew Botolan",
    address: "Dusun Ngemplak RT 05, Desa Sumbermulyo",
    fullDesc:
      "Kopi Desa Sumbermulyo hadir dari semangat memberdayakan petani kopi lokal. Biji kopi dipetik langsung dari kebun di lereng bukit, disangrai secara tradisional untuk menghasilkan cita rasa yang kaya dan autentik. Tersedia dalam kemasan bubuk maupun biji utuh.",
  },
  {
    id: 3,
    name: "Anyaman Desa",
    category: "Kerajinan",
    desc: "Produk anyaman bambu dan rotan berkualitas tinggi: tas, keranjang, dan dekorasi rumah bernilai seni tinggi.",
    owner: "Sri Wahyuningsih",
    location: "Dusun Gedangan",
    img: "https://images.unsplash.com/photo-1743485754062-b6ad79fd3278?w=600&h=400&fit=crop&auto=format",
    phone: "628345678901",
    instagram: "anyaman_desa",
    hours: "09.00 – 16.00 WIB",
    products: "Tas Anyaman, Keranjang Belanja, Dekorasi Dinding",
    address: "Dusun Gedangan RT 01, Desa Sumbermulyo",
    fullDesc:
      "Anyaman Desa adalah kelompok pengrajin yang melestarikan seni anyam bambu dan rotan secara turun-temurun. Setiap produk dibuat dengan tangan oleh pengrajin berpengalaman, menghasilkan karya yang fungsional sekaligus bernilai seni tinggi. Produk ini telah dipasarkan hingga ke luar pulau.",
  },
];

function UmkmCard({ umkm, onDetail }: { umkm: Umkm; onDetail: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "var(--off-white)",
        boxShadow: "0 2px 12px rgba(35,69,44,0.07)",
        border: "1px solid rgba(216,203,168,0.5)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(35,69,44,0.13)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(35,69,44,0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--beige)" }}>
        <img src={umkm.img} alt={umkm.name} className="w-full h-full object-cover" />
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "var(--dark-green)", color: "#fff" }}
        >
          {umkm.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-lg mb-2" style={{ color: "var(--charcoal)" }}>
          {umkm.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(32,37,32,0.68)" }}>
          {umkm.desc}
        </p>
        <div className="flex items-center gap-2 mb-5">
          <IconPin />
          <span className="text-xs" style={{ color: "var(--sage-green)" }}>
            {umkm.owner} · {umkm.location}
          </span>
        </div>
        <div className="flex gap-3">
          <a
            href={`https://wa.me/${umkm.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <IconWhatsApp size={14} /> WhatsApp
          </a>
          <button
            onClick={onDetail}
            className="flex-1 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: "1.5px solid var(--dark-green)",
              color: "var(--dark-green)",
              background: "transparent",
            }}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

function UmkmModal({ umkm, onClose }: { umkm: Umkm; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(32,37,32,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          background: "var(--off-white)",
          borderRadius: "1.5rem 1.5rem 0 0",
          boxShadow: "0 -8px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
          style={{ background: "rgba(32,37,32,0.12)" }}
        >
          <IconX />
        </button>

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-t-[1.5rem]" style={{ background: "var(--beige)" }}>
          <img src={umkm.img} alt={umkm.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-7">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block"
            style={{ background: "rgba(35,69,44,0.12)", color: "var(--dark-green)" }}
          >
            {umkm.category}
          </span>
          <h2 className="font-serif font-bold text-2xl mb-1" style={{ color: "var(--charcoal)" }}>
            {umkm.name}
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--sage-green)" }}>
            Pemilik: {umkm.owner}
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(32,37,32,0.75)" }}>
            {umkm.fullDesc}
          </p>

          <div
            className="rounded-xl overflow-hidden mb-6"
            style={{ border: "1px solid var(--beige)" }}
          >
            {[
              { icon: <IconPin />, label: "Produk", value: umkm.products },
              { icon: <IconPin />, label: "Alamat", value: umkm.address },
              { icon: <IconClock />, label: "Jam Operasional", value: umkm.hours },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex gap-3 px-5 py-3.5"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--beige)" : "none",
                  background: i % 2 === 0 ? "rgba(216,203,168,0.1)" : "transparent",
                }}
              >
                <span style={{ color: "var(--sage-green)", marginTop: 2 }}>{row.icon}</span>
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: "var(--sage-green)" }}>
                    {row.label}
                  </div>
                  <div className="text-sm" style={{ color: "var(--charcoal)" }}>
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-5">
            <a
              href={`https://instagram.com/${umkm.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ background: "rgba(35,69,44,0.1)", color: "var(--dark-green)" }}
            >
              <IconInstagram size={14} /> @{umkm.instagram}
            </a>
          </div>

          <a
            href={`https://wa.me/${umkm.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <IconWhatsApp size={18} /> Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Umkm() {
  const [selected, setSelected] = useState<Umkm | null>(null);

  return (
    <section id="umkm" className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "var(--sage-green)" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--sage-green)" }}
            >
              Produk Lokal
            </span>
          </div>
          <h2
            className="font-serif font-bold leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", color: "var(--charcoal)" }}
          >
            UMKM Unggulan Desa
          </h2>
          <p className="text-base" style={{ color: "rgba(32,37,32,0.65)" }}>
            Kenali dan dukung produk lokal masyarakat Desa {DESA_NAME}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UMKM_DATA.map((u) => (
            <UmkmCard key={u.id} umkm={u} onDetail={() => setSelected(u)} />
          ))}
        </div>
      </div>

      {selected && <UmkmModal umkm={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ─── Perangkat Desa (Flowchart Hierarchy) ────────────────────────────────────

const KEPALA_DESA = {
  name: "H. Supriyadi, S.IP.",
  jabatan: "Kepala Desa",
  role: "Pimpinan Desa",
  phone: "628111222333",
  img: "https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?w=200&h=200&fit=crop&auto=format",
};

const SEKRETARIS_DESA = {
  name: "Dra. Rini Kartika",
  jabatan: "Sekretaris Desa",
  role: "Sekretariat Desa",
  phone: "628222333444",
  img: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=200&h=200&fit=crop&auto=format",
};

const KAUR_LIST = [
  {
    name: "Agus Setiawan, S.E.",
    jabatan: "Kaur Keuangan",
    phone: "628333444555",
    img: "https://images.unsplash.com/photo-1626499370263-b2a0501f2773?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Eko Prasetyo",
    jabatan: "Kaur Umum",
    phone: "628444555666",
    img: "https://images.unsplash.com/photo-1665578705764-5c8e6282c944?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Slamet Riyadi",
    jabatan: "Kaur Perencanaan",
    phone: "628555666777",
    img: "https://images.unsplash.com/photo-1747316647681-18c79b9cd648?w=200&h=200&fit=crop&auto=format",
  },
];

function OfficialCard({
  p,
  isFeatured = false,
  badgeBg = "var(--dark-green)",
  badgeColor = "#fff",
}: {
  p: { name: string; jabatan: string; role?: string; phone: string; img: string };
  isFeatured?: boolean;
  badgeBg?: string;
  badgeColor?: string;
}) {
  return (
    <div
      className="relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 group"
      style={{
        background: "var(--off-white)",
        boxShadow: isFeatured
          ? "0 8px 30px rgba(35,69,44,0.12)"
          : "0 2px 14px rgba(35,69,44,0.06)",
        border: isFeatured
          ? "2px solid var(--sage-green)"
          : "1px solid rgba(216,203,168,0.6)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = isFeatured
          ? "0 16px 40px rgba(35,69,44,0.2)"
          : "0 12px 30px rgba(35,69,44,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = isFeatured
          ? "0 8px 30px rgba(35,69,44,0.12)"
          : "0 2px 14px rgba(35,69,44,0.06)";
      }}
    >
      {/* Role Badge */}
      <span
        className="text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full mb-3.5 shadow-xs"
        style={{ background: badgeBg, color: badgeColor }}
      >
        {p.jabatan}
      </span>

      {/* Avatar Image */}
      <div
        className={`relative ${isFeatured ? "w-24 h-24" : "w-20 h-20"} rounded-full overflow-hidden mb-3.5 transition-transform duration-300 group-hover:scale-105`}
        style={{
          border: isFeatured ? "4px solid var(--beige)" : "3px solid var(--beige)",
          boxShadow: "0 4px 14px rgba(35,69,44,0.15)",
          background: "var(--beige)",
        }}
      >
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
      </div>

      {/* Name */}
      <h3
        className={`font-serif font-bold ${isFeatured ? "text-base lg:text-lg" : "text-sm lg:text-base"} leading-snug mb-3`}
        style={{ color: "var(--charcoal)" }}
      >
        {p.name}
      </h3>

      {/* Contact Quick Buttons */}
      <div className="flex items-center justify-center gap-2 mt-auto pt-1">
        <a
          href={`https://wa.me/${p.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="WhatsApp"
          style={{ background: "rgba(37,211,102,0.15)", color: "#25D366" }}
        >
          <IconWhatsApp size={14} />
        </a>
        <a
          href={`tel:+${p.phone}`}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Telepon"
          style={{ background: "rgba(35,69,44,0.1)", color: "var(--dark-green)" }}
        >
          <IconPhone />
        </a>
        <a
          href={`mailto:desa.${DESA_NAME.toLowerCase()}@${KABUPATEN.toLowerCase()}.go.id`}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Email"
          style={{ background: "rgba(123,146,117,0.15)", color: "var(--sage-green)" }}
        >
          <IconMail />
        </a>
      </div>
    </div>
  );
}

function ConnectorVertical() {
  return (
    <div className="flex flex-col items-center justify-center my-1.5">
      <div className="w-0.5 h-7" style={{ background: "linear-gradient(to bottom, var(--dark-green), var(--sage-green))" }} />
      <div className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ background: "var(--sage-green)" }} />
      <div className="w-0.5 h-7" style={{ background: "linear-gradient(to bottom, var(--sage-green), var(--dark-green))" }} />
    </div>
  );
}

function Perangkat() {
  return (
    <section
      id="perangkat-desa"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "var(--beige-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(35,69,44,0.08)" }}>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--dark-green)" }}
            >
              Struktur Organisasi
            </span>
          </div>
          <h2
            className="font-serif font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "var(--charcoal)" }}
          >
            Bagan Perangkat Desa {DESA_NAME}
          </h2>
          <p className="text-sm mt-3" style={{ color: "rgba(32,37,32,0.7)" }}>
            Struktur hierarki kepemimpinan dan tata kelola pelayanan masyarakat Desa {DESA_NAME}
          </p>
        </div>

        {/* FLOWCHART HIERARCHY TREE */}
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
          
          {/* LEVEL 1: KEPALA DESA (Top Level) */}
          <div className="w-full max-w-xs z-10">
            <OfficialCard
              p={KEPALA_DESA}
              isFeatured={true}
              badgeBg="var(--dark-green)"
              badgeColor="#ffffff"
            />
          </div>

          {/* CONNECTOR LINE LEVEL 1 -> LEVEL 2 */}
          <ConnectorVertical />

          {/* LEVEL 2: SEKRETARIS DESA (Second Level) */}
          <div className="w-full max-w-xs z-10">
            <OfficialCard
              p={SEKRETARIS_DESA}
              isFeatured={false}
              badgeBg="var(--sage-green)"
              badgeColor="#ffffff"
            />
          </div>

          {/* CONNECTOR BRANCHING LEVEL 2 -> LEVEL 3 */}
          <div className="w-full flex flex-col items-center my-2">
            {/* Vertical stem from Sekdes */}
            <div className="w-0.5 h-6 bg-[var(--sage-green)]" />
            
            {/* Desktop Horizontal Line connecting 3 columns */}
            <div className="hidden md:block w-3/4 h-0.5 bg-[var(--sage-green)] relative">
              <div className="absolute left-0 top-0 w-0.5 h-6 bg-[var(--sage-green)]" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-[var(--sage-green)]" />
              <div className="absolute right-0 top-0 w-0.5 h-6 bg-[var(--sage-green)]" />
            </div>

            {/* Mobile Vertical Stem */}
            <div className="md:hidden w-0.5 h-6 bg-[var(--sage-green)]" />
          </div>

          {/* LEVEL 3: KAUR (3 Columns) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
            {KAUR_LIST.map((kaur) => (
              <div key={kaur.jabatan} className="w-full">
                <OfficialCard
                  p={kaur}
                  isFeatured={false}
                  badgeBg="rgba(216,203,168,0.7)"
                  badgeColor="var(--charcoal)"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Kontak ──────────────────────────────────────────────────────────────────

function Kontak() {
  return (
    <section id="kontak" className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "var(--sage-green)" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--sage-green)" }}
            >
              Layanan Publik
            </span>
          </div>
          <h2
            className="font-serif font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", color: "var(--charcoal)" }}
          >
            Hubungi Pemerintah Desa
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info kontak */}
          <div>
            <div className="space-y-5 mb-8">
              {[
                { icon: <IconPin />, label: "Alamat Kantor", value: `Jl. Desa ${DESA_NAME} No. 01, ${KECAMATAN}, ${KABUPATEN}, ${PROVINSI}` },
                { icon: <IconPhone />, label: "Telepon", value: "(0274) 123-456" },
                { icon: <IconMail />, label: "Email", value: `desa.${DESA_NAME.toLowerCase()}@${KABUPATEN.toLowerCase()}.go.id` },
                { icon: <IconWhatsApp />, label: "WhatsApp", value: "+62 812-3456-7890" },
                { icon: <IconClock />, label: "Jam Pelayanan", value: "Senin – Jumat, 08.00 – 15.00 WIB" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(35,69,44,0.08)", color: "var(--dark-green)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "var(--sage-green)" }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--dark-green)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(35,69,44,0.3)",
              }}
            >
              <IconWhatsApp size={16} /> Hubungi Kami
            </button>
          </div>

          {/* Maps placeholder */}
          <div
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: "rgba(123,146,117,0.15)",
              border: "1px solid rgba(216,203,168,0.6)",
              boxShadow: "0 8px 30px rgba(35,69,44,0.1)",
            }}
          >
            <iframe
              title="Lokasi Kantor Desa Sumbermulyo"
              src="https://maps.google.com/maps?q=Kawedanan+Magetan+Jawa+Timur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--dark-green)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(248,247,242,0.12)" }}>
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: "rgba(248,247,242,0.15)", color: "var(--off-white)" }}
              >
                DS
              </div>
              <span className="font-serif font-semibold text-lg" style={{ color: "var(--off-white)" }}>
                Desa {DESA_NAME}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(248,247,242,0.6)" }}>
              Informasi resmi dan potensi Desa {DESA_NAME}, {KECAMATAN}, {KABUPATEN}.
            </p>
          </div>

          {/* Col 2 – navigasi */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(248,247,242,0.45)" }}>
              Navigasi
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: "rgba(248,247,242,0.75)" }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – sosmed */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(248,247,242,0.45)" }}>
              Media Sosial
            </h4>
            <div className="flex gap-3">
              {[
                { icon: <IconInstagram size={18} />, label: "Instagram" },
                { icon: <IconFacebook size={18} />, label: "Facebook" },
                { icon: <IconYoutube size={18} />, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(248,247,242,0.1)",
                    color: "rgba(248,247,242,0.8)",
                    border: "1px solid rgba(248,247,242,0.15)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left" style={{ color: "rgba(248,247,242,0.45)" }}>
            © 2026 Desa {DESA_NAME}. Semua Hak Dilindungi.
          </p>
          <p className="text-xs text-center sm:text-right" style={{ color: "rgba(248,247,242,0.35)" }}>
            Website dikembangkan sebagai bagian dari Program Kerja KKN.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <SambutanKepalaDesa />
      <Stats />
      <About />
      <Potensi />
      <Umkm />
      <Perangkat />
      <Kontak />
      <Footer />
    </div>
  );
}

