"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoWhite from "../../public/assets/light-logo.svg";
import logDark from "../../public/assets/dark-logo.svg";
import TopDropDownMenu from "./TopDropDownMenu";
import { useTheme } from "next-themes";
import { AlignHorizontalJustifyCenter } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import logo from "../../public/assets/light-logo.svg";
import styled, { css } from "styled-components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import {
  AlignRight,
  ChevronRightIcon,
  LogOut,
  MonitorDot,
  Moon,
  MoonStar,
  Sun,
} from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  theme_title: string;
  theme_light: string;
  theme_dark: string;
  theme_system: string;
  lang_title: string;
  lang_eng: string;
  lang_kor: string;
  information: string;
  bug_report: string;
  logout: string;
}
const TopBarSpare = ({
  theme_title,
  theme_light,
  theme_dark,
  theme_system,
  lang_title,
  lang_eng,
  lang_kor,
  information,
  bug_report,
  logout,
}: Props) => {
  const router = useRouter();
  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="topbarSpare  bg-white dark:topbarSpareBg">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex items-center justify-center w-full ">
          <div className="h-8 w-8 ">
            <Image
              src={theme === "dark" ? logoWhite : logDark}
              alt="Threads logo"
            />
          </div>
        </div>
        <p
          className={`text-heading3-bold max-xs:hidden ml-0 ${
            theme === "dark" ? "text-light-1" : "text-black"
          }`}
        >
          Threads
        </p>
        <p className=" m-0  text-x-small-semibold text-neutral-600 ">(clone)</p>
      </Link>
      <div className="flex flex-row justify-end  items-center ">
        <div
          className={`flex flex-row toggleDarkmode ${
            theme === "dark" ? "text-white " : "text-black"
          }`}
        >
          {/* <TopDropDownMenu /> */}
          <DropdownMenu open={tdmModalOpen} onOpenChange={setTdmModalOpen}>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setTdmModalOpen((prev) => !prev);
              }}
            >
              <AlignRight />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="topDropDown dark:bg-neutral-700"
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
                  {theme_title}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    className=" dark:bg-neutral-700"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("light")}
                    >
                      {theme_light} <Sun width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("dark")}
                    >
                      {theme_dark} <MoonStar width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("system")}
                    >
                      {theme_system}
                      <MonitorDot width={14} height={14} />
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
                  {lang_title}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    className=" dark:bg-neutral-700"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("light")}
                    >
                      {lang_kor}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("dark")}
                    >
                      {lang_eng}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="topDropDownSub">
                {information}
              </DropdownMenuItem>
              <DropdownMenuItem className="topDropDownSub">
                {bug_report}
              </DropdownMenuItem>
              <DropdownMenuItem className="topDropDownSub2">
                <SignedIn>
                  <SignOutButton
                    signOutCallback={() => {
                      router.push("/sign-out");
                    }}
                  >
                    <div className=""> {logout}</div>
                  </SignOutButton>
                </SignedIn>
                <LogOut width={14} height={14} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default TopBarSpare;
