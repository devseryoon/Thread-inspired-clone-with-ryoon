import BottomBar from "@/components/shared/BottomBar";

import TopBar from "@/components/shared/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { fetchUser } from "@/lib/actions/user.actions";
import { ThemeProvider } from "@/lib/providers/themeProvider";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../../app/globals.css";
import { usePreferredLanguage } from "@uidotdev/usehooks";
import LangProvider from "@/lib/providers/langProvider";
type Props = {
  children: ReactNode;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validate that the incoming `locale` parameter is valid
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userInfo = await fetchUser(user.id);
  if (!userInfo) {
    redirect("/sign-in");
  }
  const modUserId = JSON.stringify(userInfo._id).replace(/\"/gi, "");
  const userInfoForPassing = {
    id: modUserId.replace(/\\/g, ""),
    bio: userInfo.bio,
    image: userInfo.image,
    name: userInfo.name,
    username: userInfo.username,
  };
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LangProvider>
              <TopBar />
              <main className="flex flex-row">
                <section className="main-container">
                  <div className="w-full max-w-xl">{children}</div>
                </section>
              </main>
              <BottomBar
                userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
                // userInfo={userInfo}
                userInfoForPassing={userInfoForPassing}
                // krRes={krRes}
              />
              <Toaster />
            </LangProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
