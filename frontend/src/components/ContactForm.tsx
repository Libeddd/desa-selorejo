"use client";

import { useState } from "react";

interface ContactFormProps {
  phone: string;
}

export default function ContactForm({ phone }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    const form = e.target as HTMLFormElement;
    const nama = (form.elements.namedItem("nama") as HTMLInputElement).value;
    const nohp = (form.elements.namedItem("nohp") as HTMLInputElement).value;
    const pesan = (form.elements.namedItem("pesan") as HTMLTextAreaElement).value;

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        // Jika ada URL Webhook Spreadsheet, kirim data ke sana (Background process)
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nohp", nohp);
        formData.append("pesan", pesan);

        await fetch(webhookUrl, {
          method: "POST",
          body: formData,
          mode: "no-cors", // Google Forms/Apps script kadang perlu no-cors
        });
        
        setSuccess(true);
        form.reset();
      } else {
        // Fallback: Jika tidak ada webhook URL, buka WhatsApp seperti biasa
        const teks = `Halo, saya *${nama}* (${nohp}).\n\n${pesan}`;
        const waNumber = phone.replace(/\D/g, "") || "6285100000000";
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(teks)}`, "_blank");
        setSuccess(true);
        form.reset();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-semibold mb-4">
          ✅ Pesan Anda berhasil dikirim!
        </div>
      )}
      
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-semibold mb-4">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          name="nama"
          type="text"
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6b8e6b] outline-none transition-all disabled:opacity-60"
          placeholder="Masukkan nama Anda"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          No. HP / WhatsApp
        </label>
        <input
          name="nohp"
          type="text"
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all disabled:opacity-60"
          placeholder="Contoh: 08123456789"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pesan atau Keperluan
        </label>
        <textarea
          name="pesan"
          rows={4}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none transition-all resize-none disabled:opacity-60"
          placeholder="Tulis pesan Anda di sini..."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
        style={{
          background: "var(--dark-green, #1e3f20)",
          boxShadow: "0 4px 15px rgba(30,63,32,0.3)",
        }}
      >
        {loading ? (
          <span className="animate-pulse">Mengirim...</span>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Kirim Pesan
          </>
        )}
      </button>
    </form>
  );
}
