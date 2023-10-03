//SEO
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thread",
  description: "A Next.js 13 Meta Threads App 제작",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <body suppressHydrationWarning={true}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
