import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { currentUser } from "@clerk/nextjs";
// import { redirect } from "@/navigation";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../../globals.css";

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
  if (!user) {
    console.log("로그아ㅣㄴ 안됨");
    redirect("/sign-in");
  }

  // const userInfo = await fetchUser(user?.id);
  // const userInfoForPassing = {
  //   id: JSON.stringify(userInfo._id),
  //   bio: userInfo.bio,
  //   image: userInfo.image,
  //   name: userInfo.name,
  //   username: userInfo.username,
  // };
  // // console.log("userInfo::::::::", { userInfo });
  // if (!userInfo?.onboarded) redirect("/onboarding");
  // const headersList = headers();
  // const krRes = containsKr(headersList);

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
        // userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
        // userInfoForPassing={userInfoForPassing}
        // krRes={krRes}
        />
        <Toaster />
      </body>
    </html>
  );
}
