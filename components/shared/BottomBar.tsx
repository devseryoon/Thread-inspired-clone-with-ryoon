"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import translate from "@/messages/en.json";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GroupIcon, Heart, Home, Search } from "lucide-react";
import { useEffect } from "react";
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

const BottomBar = ({
  userId,
  // userInfo,
  userInfoForPassing,
}: {
  userId: any;
  // userInfo: any;
  userInfoForPassing: any;
}) => {
  const pathname = usePathname();
  // const { user, isLoaded, isSignedIn } = useUser();
  // console.log("user::", user, isLoaded, isSignedIn);
  // const { theme } = useTheme();
  const intl = translate.BottomBar;

  const infos = async () => {
    console.log("BottomBar");

    // const userInfo = await fetchUser(user!.id);
    // console.log(`userInfo: ${userInfo}`);
  };

  useEffect(() => {
    infos();
  }, []);

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
        {/* <Link
          href={"/create-thread"}
          className={`bottombar_link ${
            pathname === "/communities" && "bottom_click"
          } bottom_action`}
        >
          <Edit
            className={`w-6 h-6 ${
              pathname === "/create-thread"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link> */}
        <div
          className={`
            bottombar_link 
          bottom_action
          `}
        >
          <CustomCreateThreadModal
            userId={userId}
            // userInfo={userInfo}
            // krRes={krRes}
            userInfoForPassing={userInfoForPassing}
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
            <span>{intl.terms}</span>
          </li>
          <li>
            <span>{intl.privacy_policy}</span>
          </li>
          <li>
            <span>{intl.cookie}</span>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default BottomBar;
