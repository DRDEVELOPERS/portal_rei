/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.diferpan.com.br",
      "www.diferpan.com.br",
      "m.media-amazon.com", // Remove https:// prefix
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default nextConfig;
