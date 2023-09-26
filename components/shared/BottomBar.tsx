"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import { sidebarLinkDark, sidebarLinkWhite } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
//모바일용
const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const { theme } = useTheme();
  console.log("ddsfdsfsdfdsf theme", theme);
  var tempLinks = theme === "dark" ? sidebarLinkDark : sidebarLinkWhite;
  return (
    <section
      className={`sticky  bottom-0 z-10 w-full 
      rounded-t-3xl p-4 backdrop-blur-lg
      
       xs:px-7 flex flex-col 
       justify-center 
       items-center
       ${theme === "dark" ? "forDarkBg" : "bg-inherit"}
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

              {/* <p
                style={{ color: isActive ? "#EFEFEF" : "rgb(119, 119, 119)" }}
                className="text-subtle-medium  max-sm:hidden"
              >
                {link.label.split(/\s+/)[0]}
              </p> */}
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
            <span>Threads 약관</span>
          </li>
          <li>
            <span>개인정보처리방침</span>
          </li>
          <li>
            <span>쿠키</span>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default BottomBar;
