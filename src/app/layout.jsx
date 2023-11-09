'use client';

import Providers from 'utils/provider';
// layout.tsx
import localFont from 'next/font/local';

export const dynamic = 'force-dynamic';

export const pretendard = localFont({
  src: [
    {
      path: './Pretendard-Medium.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
});
export const metadata = {
  metadataBase: new URL('http://localhost:2000'),
  title: {
    template: '%s | JUBORA',
    default: 'JUBORA',
  },
  description: '교회 현수막, 판촉, 전도지 등 교회용품 업체입니다',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  openGraph: {
    title: 'JUBORA',
    description: '교회 현수막, 판촉, 전도지 등 교회용품 업체입니다',
    url: 'https://jubora.com',
    siteName: 'JUBORA',
    locale: 'ko_kr',
    type: 'website',
    images: [
      {
        url: `https://maxleiter.com/api/og?title=${encodeURIComponent("Max Leiter's site")}`,
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
