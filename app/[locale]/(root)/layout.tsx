import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { ThemeProvider } from "@/lib/providers/themeProvider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { containsKr } from "@/lib/utils";

// async function getMessages(locale: string) {
//   try {
//     return (await import(`../../../messages/${locale}.json`)).default;
//   } catch (error) {
//     notFound();
//   }
// }

// export async function generateStaticParams() {
//   return ["en", "kr"].map((locale) => ({ locale }));
// }

type Props = {
  children: ReactNode;
  // params: { locale: string };
};

export default async function RootLayout({
  children,
}: // params: { locale },
Props) {
  // Validate that the incoming `locale` parameter is valid
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  const userInfoForPassing = {
    id: JSON.stringify(userInfo._id),
    bio: userInfo.bio,
    image: userInfo.image,
    name: userInfo.name,
    username: userInfo.username,
  };
  // console.log("userInfo::::::::", { userInfo });
  if (!userInfo?.onboarded) redirect("/onboarding");
  const headersList = headers();
  const krRes = containsKr(headersList);

  return (
    <html>
      <body className="dark:forDarkBg">
        <TopBar />
        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full max-w-xl">{children}</div>
          </section>
        </main>
        <BottomBar
          userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
          userInfoForPassing={userInfoForPassing}
          krRes={krRes}
        />
        <Toaster />
      </body>
    </html>
  );
}
