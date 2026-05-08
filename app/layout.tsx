import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "주보라 – 현수막·배너 온라인 제작",
    template: "%s | 주보라",
  },
  description:
    "현수막 주문, 배너 제작, 실사출력을 온라인으로! 직접 디자인하고 당일 제작·전국 배송.",
  keywords: ["현수막 주문", "배너 제작", "현수막 제작", "온라인 현수막", "X배너"],
  openGraph: {
    type: "website",
    siteName: "주보라",
    images: [{ url: "https://jubora.kr/og-image.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
