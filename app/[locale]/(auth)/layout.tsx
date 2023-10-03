//SEO
import { ClerkProvider, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../../globals.css";
import { ThemeProvider } from "@/lib/providers/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
