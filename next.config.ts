import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "sgp1.digitaloceanspaces.com" },
      { protocol: "https", hostname: "cdn.fatherstock.com" },
      { protocol: "https", hostname: "ae01.alicdn.com" },
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "fatherstock-cache.b-cdn.net" },
    ],
  },
};

export default nextConfig;
