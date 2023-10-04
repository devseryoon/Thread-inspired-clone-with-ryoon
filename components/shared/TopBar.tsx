"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logDark from "../../public/assets/dark-logo.svg";
import logoWhite from "../../public/assets/light-logo.svg";

import { AlignRight, LogOut, MonitorDot, MoonStar, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useTransition } from "react";
import BackButton from "./BackButton";

const TopBar = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const intl = useTranslations("TopDropDownMenu");

  function onSelectLangChange(value: string) {
    // const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }

  // useEffect(() => {
  //   if (theme === "" || theme === undefined || theme === null) {
  //     setTheme("dark");
  //   }
  // }, []);

  return (
    <nav
      className="fixed top-0 z-30  
    w-full items-center 
     px-6 py-3 flex flex-row
      bg-white dark:topbarBg"
    >
      <BackButton />
      <Link href="/" className="flex flex-1 items-center gap-4">
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
        <p className="m-0 horizontal text-x-small-semibold text-neutral-600 ">
          ({intl("clone")})
        </p>
      </Link>
      <div className="flex flex-1 flex-row justify-end  items-center ">
        <div
          className={`flex flex-row toggleDarkmode ${
            theme === "dark" ? "text-white " : "text-black"
          }`}
        >
          {/* <TopDropDownMenu /> */}
          {/* <LocaleSwitcher /> */}
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
                  {intl("theme.title")}
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
                      {intl("theme.light")} <Sun width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("dark")}
                    >
                      {intl("theme.dark")} <MoonStar width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("system")}
                    >
                      {intl("theme.system")}
                      <MonitorDot width={14} height={14} />
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
                  {intl("languages.title")}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    className=" dark:bg-neutral-700"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => onSelectLangChange("kr")}
                    >
                      {intl("languages.kor")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => onSelectLangChange("en")}
                    >
                      {intl("languages.eng")}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="topDropDownSub">
                {intl("information")}
              </DropdownMenuItem>
              <DropdownMenuItem className="topDropDownSub">
                {intl("bug_report")}
              </DropdownMenuItem>
              <DropdownMenuItem className="topDropDownSub2">
                <SignedIn>
                  <SignOutButton
                    signOutCallback={() => {
                      router.push("/sign-out");
                    }}
                  >
                    <div className=""> {intl("logout")}</div>
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

export default TopBar;
