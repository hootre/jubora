import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "jubora.co.kr" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
    unoptimized: false,
  },
  eslint: {
    // 빌드 시 ESLint 에러가 있어도 배포 진행
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 시 TypeScript 에러가 있어도 배포 진행
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Firebase Auth v11이 서버에서 import될 때
      // NextServerComponentAuthStorageAdapter → cookies() 호출 에러 방지
      // 모든 auth 호출은 useEffect/이벤트 핸들러 내에서만 실행되므로
      // 서버 번들에서 제외해도 안전함
      config.resolve.alias = {
        ...config.resolve.alias,
        "firebase/auth": false,
      };
    }
    return config;
  },
};

export default nextConfig;
