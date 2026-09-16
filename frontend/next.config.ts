import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan gambar dari Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Environment variables yang di-expose ke client (selain NEXT_PUBLIC_*)
  // sudah otomatis lewat NEXT_PUBLIC_ prefix
};

export default nextConfig;
