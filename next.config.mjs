/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.diferpan.com.br",
      "www.diferpan.com.br",
      "m.media-amazon.com",
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
