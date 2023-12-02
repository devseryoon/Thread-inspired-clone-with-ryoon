import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../../globals.css";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: //
Props) {
  // Validate that the incoming `locale` parameter is valid
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  console.log("1111111");
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <TopBar />
        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full max-w-xl">{children}</div>
          </section>
        </main>
        <BottomBar
        // userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
        // userInfoForPassing={userInfoForPassing}
        // krRes={krRes}
        />
        <Toaster />
      </body>
    </html>
  );
}
