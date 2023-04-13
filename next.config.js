/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'jubora.co.kr'],
  },
};
module.exports = nextConfig;
