import TopBar from "@/components/shared/TopBar";
import "../globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/lib/providers/themeProvider";
const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} body`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <TopBar />
            <main className="flex flex-row">
              {/* <LeftSideBar /> */}
              <section className="main-container">
                <div className="w-full max-w-xl">{children}</div>
              </section>
              {/* <RightSideBar /> */}
            </main>
            <BottomBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
