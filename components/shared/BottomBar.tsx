"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GroupIcon, Heart, Home, Search } from "lucide-react";
import CustomCreateThreadModal from "../modal/CustomCreateThreadModal";
interface Props {
  userId: string;
  krRes: boolean;
  userInfoForPassing: {
    id: string;
    bio: string;
    image: string;
    name: string;
    username: string;
  };
}

const BottomBar = ({ userId, krRes, userInfoForPassing }: Props) => {
  const pathname = usePathname();

  const { theme } = useTheme();
  const intl = useTranslations("BottomBar");

  return (
    <section
      className={`sticky  bottom-0 z-10 w-full 
      rounded-t-3xl p-4 
      
       xs:px-7 flex flex-col 
       justify-center 
       items-center
       bg-white
       dark:forDarkBg dark:backdrop-blur-lg
       `}
    >
      <div className="bottombar_container">
        {/* {tempLinks.map((link, index) => {
          console.log("index=", index);
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          if (index !== 3) {
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${
                  isActive && "bottom_click"
                } bottom_action`}
              >
                <Image
                  src={isActive ? link.imgURL.active : link.imgURL.gray}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </Link>
            );
          } else {
            return (
              <div className="">
                <CreateThreadModal userId={userId} krRes={krRes} />
              </div>
            );
          }
        })} */}
        <Link
          href={"/"}
          className={`bottombar_link ${
            pathname === "/" && "bottom_click"
          } bottom_action`}
        >
          <Home
            className={`w-6 h-6 ${
              pathname === "/"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        <Link
          href={"/search"}
          className={`bottombar_link ${
            pathname === "/search" && "bottom_click"
          } bottom_action`}
        >
          <Search
            className={`w-6 h-6 ${
              pathname === "/search"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        <Link
          href={"/activity"}
          className={`bottombar_link ${
            pathname === "/activity" && "bottom_click"
          } bottom_action`}
        >
          <Heart
            className={`w-6 h-6 ${
              pathname === "/activity"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        <div
          className={`bottombar_link ${
            pathname === "/create-thread" && "bottom_click"
          } bottom_action`}
        >
          {/* <CreateThreadModal
            userId={userId}
            krRes={krRes}
            userInfo={userInfo}
          /> */}
          <CustomCreateThreadModal
            userId={userId}
            krRes={krRes}
            userInfoForPassing={userInfoForPassing}
            // setIsOpen={setIsOpen}
            // isOpen={isOpen}
          />
        </div>
        <Link
          href={"/communities"}
          className={`bottombar_link ${
            pathname === "/communities" && "bottom_click"
          } bottom_action`}
        >
          <GroupIcon
            className={`w-6 h-6 ${
              pathname === "/communities"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
      </div>
      <footer className="footer">
        <ul>
          <li>
            <span>© 2023</span>
          </li>
          <li>
            <span>{intl("terms")}</span>
          </li>
          <li>
            <span>{intl("privacy_policy")}</span>
          </li>
          <li>
            <span>{intl("cookie")}</span>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default BottomBar;
