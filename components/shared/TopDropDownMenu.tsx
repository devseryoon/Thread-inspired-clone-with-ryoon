"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import {
  AlignRight,
  ChevronRightIcon,
  LogOut,
  MonitorDot,
  Moon,
  MoonStar,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const TopDropDownMenu = () => {
  const router = useRouter();
  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  const [lang, setLang] = useState(1);
  const { setTheme } = useTheme();

  return (
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
            모드전환
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
                Light <Sun width={14} height={14} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="DropdownMenuItem"
                onClick={() => setTheme("dark")}
              >
                Dark <MoonStar width={14} height={14} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="DropdownMenuItem"
                onClick={() => setTheme("system")}
              >
                System
                <MonitorDot width={14} height={14} />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
            Languages
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
                Kor
              </DropdownMenuItem>
              <DropdownMenuItem
                className="DropdownMenuItem"
                onClick={() => setTheme("dark")}
              >
                Eng
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem className="topDropDownSub">정보</DropdownMenuItem>
        <DropdownMenuItem className="topDropDownSub">버그신고</DropdownMenuItem>
        <DropdownMenuItem className="topDropDownSub2">
          <SignedIn>
            <SignOutButton
              signOutCallback={() => {
                router.push("/sign-out");
              }}
            >
              <div className="">로그아웃</div>
            </SignOutButton>
          </SignedIn>
          <LogOut width={14} height={14} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopDropDownMenu;
