import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { locales } from "@/navigation";
async function Home({
  searchParams,
  params: { locale },
}: {
  searchParams: { [key: string]: string | undefined };
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const user = await currentUser();
  if (!user) {
    console.log("로그인 안됨");
    redirect("/sign-in");
  }
  const userInfo = await fetchUser(user.id);
  // console.log(`userInfo::::::::`, userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <section className="flex flex-col gap-10 ">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
