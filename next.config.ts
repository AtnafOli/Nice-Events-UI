import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "encrypted-tbn0.gstatic.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
    ],
  },
  swcMinify: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
