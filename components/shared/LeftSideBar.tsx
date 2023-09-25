"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              style={{ background: `${isActive} && rgba(255, 255, 255, 0.05)` }}
              className={`leftsidebar_link ${
                isActive && "left_click"
              } left_action`}
            >
              <Image
                src={isActive ? link.imgURL.white : link.imgURL.dark}
                alt={link.label}
                width={24}
                height={24}
              />
              <p
                style={{ color: isActive ? "#EFEFEF" : "rgb(119, 119, 119)" }}
                className=" max-lg:hidden"
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          {/* <UserButton /> */}
          <SignOutButton
            signOutCallback={() => {
              router.push("/sign-in");
            }}
          >
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
