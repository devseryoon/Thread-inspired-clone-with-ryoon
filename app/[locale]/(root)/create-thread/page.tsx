import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { containsKr } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const headersList = headers();
  const krRes = containsKr(headersList);

  return (
    <>
      <h1 className="head-text">
        {krRes ? "스레드를 작성하세요" : "Create Thread"}
      </h1>
      <PostThread
        userId={JSON.stringify(userInfo._id).replace(/\"/gi, "")}
        krRes={krRes}
      />
    </>
  );
}

export default Page;
