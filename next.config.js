/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 31536000, // 1 year
    formats: ["image/avif", "image/webp"], //Since AVIF is first, it will be served if the browser supports AVIF. If not, WebP will be served if the browser supports WebP. If neither format is supported, the original image format will be served.
    deviceSizes: [420, 720, 1080, 1366, 1440, 1920, 2560, 3840],
    domains: ["7879.co", "media.7879.co", "localhost"],
  },
};

module.exports = nextConfig;
