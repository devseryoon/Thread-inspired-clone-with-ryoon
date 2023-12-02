import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/lib/providers/themeProvider";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../../app/globals.css";
import { dark } from "@clerk/themes";
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
            // userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
            // userInfoForPassing={userInfoForPassing}
            // krRes={krRes}
            />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
