"use client";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import logo from "../../public/assets/light-logo.svg";
import { Bold } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
const TopBar = () => {
  // const temopUser = useUser();
  // console.log("temopUser: ", temopUser);

  const [toggleDarkmode, setToggleDarkMode] = useState(false);
  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  // useEffect(() => {
  //   console.log("DarkModeOn");
  //   setTdmModalOpen((prev) => !prev);
  // }, [toggleDarkmode]);
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex items-center justify-center w-full ">
          <div className="h-8 w-8 ">
            <Image src={logo} alt="Threads logo" />
          </div>
        </div>
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignedOut>
              <div className="flex-cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignedOut>
          </SignedIn>
        </div>
        <div
          className="toggleDarkmode"
          onClick={() => {
            setTdmModalOpen((prev) => !prev);
            console.log("modal open");
          }}
        >
          <div className="space-y-2 justify-end items-end">
            <Skeleton className="h-1 w-[10px]" />
            <Skeleton className="h-1 w-[15px]" />
          </div>
          <div className={`tdmModal ${tdmModalOpen ? "flex" : "hidden"}`}>
            <span className="tdmMOdal sub">모드전환</span>
            <span className="tdmMOdal sub">정보</span>
            <span className="tdmMOdal sub">문제신고</span>
            <span className="tdmMOdal  none">로그아웃</span>
          </div>
        </div>
        {/* <OrganizationSwitcher
          hidePersonal={false}
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
      </div>
    </nav>
  );
};

export default TopBar;
