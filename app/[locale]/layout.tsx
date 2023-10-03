import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "kr"];
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html>
      <body suppressHydrationWarning={true} className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
