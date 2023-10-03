import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { ThemeProvider } from "@/lib/providers/themeProvider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "../../globals.css";

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "kr"].map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  const messages = await getMessages(locale);
  return (
    <html>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <ReturnTopBar /> */}
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
