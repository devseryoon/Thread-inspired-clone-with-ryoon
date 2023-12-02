import { ThemeProvider } from "@/lib/providers/themeProvider";
import { enUS, koKR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dark } from "@clerk/themes";
// export async function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }
// Receive messages provided in `i18n.ts`

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log("LocaleLayout");
  const messages = useMessages();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale}>
          <body suppressHydrationWarning={true}>
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
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
