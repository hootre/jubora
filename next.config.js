const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  experimental: { appDir: true },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'jubora.co.kr'],
  },
};
module.exports = nextConfig;
