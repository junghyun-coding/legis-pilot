import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "법령이음 — 입법 제안·시행령 정비 검토 AI",
  description:
    "국민 입법 제안을 국가법령정보와 연동해 분석하고, 법제처 공무원용 시행령 정비 검토 리포트를 자동 생성하는 AI 에이전트.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
