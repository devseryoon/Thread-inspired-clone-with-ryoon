import { ThemeProvider } from "@/lib/providers/themeProvider";
import { enUS, koKR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "kr"];
// export async function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "kr" }];
}
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = await getMessages(locale);
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider localization={locale === "en" ? enUS : koKR}>
        <html lang={locale}>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
