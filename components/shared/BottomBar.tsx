"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import { sidebarLinkDark, sidebarLinkWhite } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const { theme } = useTheme();
  const intl = useTranslations("BottomBar");

  var tempLinks = theme === "dark" ? sidebarLinkDark : sidebarLinkWhite;
  return (
    <section
      className={`sticky  bottom-0 z-10 w-full 
      rounded-t-3xl p-4 
      
       xs:px-7 flex flex-col 
       justify-center 
       items-center
       ${theme === "dark" ? "forDarkBg backdrop-blur-lg" : "bg-white"}
       `}
    >
      <div className="bottombar_container">
        {tempLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
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
        })}
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
