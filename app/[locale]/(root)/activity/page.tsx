import ActivityCard from "@/components/shared/ActivityCard";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { containsKr } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  console.log(`userInfo: ${userInfo}`);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const headersList = headers();
  const krRes = containsKr(headersList);

  //get Activity하기
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">{krRes ? "액티비티" : "Activity"}</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((act) => {
              return (
                <ActivityCard
                  key={act._id}
                  href={act.parentId}
                  src={act.author.image}
                  name={act.author.name}
                />
              );
            })}
          </>
        ) : (
          <p
            style={{ color: "rgb(119, 119, 119)" }}
            className="!text-base-regular"
          >
            {krRes ? "액티비티가 없습니다." : "no activity yet"}
          </p>
        )}
      </section>
    </section>
  );
}

export default page;
