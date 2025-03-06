/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.diferpan.com.br", "www.diferpan.com.br"], // Add your image hosts here
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
