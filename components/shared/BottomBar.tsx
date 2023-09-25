"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
//모바일용
const BottomBar = () => {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${
                isActive && "bottom_click"
              } bottom_action`}
            >
              <Image
                src={isActive ? link.imgURL.white : link.imgURL.dark}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />

              <p
                style={{ color: isActive ? "#EFEFEF" : "rgb(119, 119, 119)" }}
                className="text-subtle-medium  max-sm:hidden"
              >
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
