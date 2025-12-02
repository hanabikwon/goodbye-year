import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025 연말결산 | 나의 한 해를 돌아보다",
  description: "2025년을 함께 돌아보는 따뜻한 연말결산. 친구들과 공유하세요!",
  openGraph: {
    title: "2025 연말결산",
    description: "나의 2025년은 어땠을까? 지금 확인해보세요!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="felt-texture min-h-screen">
        {children}
      </body>
    </html>
  );
}
