/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { appDir: true },
  images: {
    domains: ['firebasestorage.googleapis.com', 'jubora.co.kr'],
  },
};
module.exports = nextConfig;
