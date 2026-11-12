import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sgp1.digitaloceanspaces.com" },
      { protocol: "https", hostname: "cdn.fatherstock.com" },
      { protocol: "https", hostname: "ae01.alicdn.com" },
    ],
  },
};

export default nextConfig;
