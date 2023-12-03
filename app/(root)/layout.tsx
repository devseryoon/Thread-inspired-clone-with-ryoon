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
  const userInfoForPassing = {
    id: userInfo._id,
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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
