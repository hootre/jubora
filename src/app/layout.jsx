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

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        <title>jubora</title>
        <meta name="description" content="교회현수막 전문업체입니다" />
        <meta property="og:title" content="주보라(JUBORA)" />
        <meta property="og:image" content="/image/logo.png" />
        <meta property="og:description" content="교회현수막 전문업체입니다" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
