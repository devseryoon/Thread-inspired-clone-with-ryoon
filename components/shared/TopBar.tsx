"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/assets/light-logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { AlignRight } from "lucide-react";
import TopDropDownMenu from "./TopDropDownMenu";

const TopBar = () => {
  const router = useRouter();
  const [tdmModalOpen, setTdmModalOpen] = useState(false);

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex items-center justify-center w-full ">
          <div className="h-8 w-8 ">
            <Image src={logo} alt="Threads logo" />
          </div>
        </div>
        <p className="text-heading3-bold text-light-1 max-xs:hidden ml-0">
          Threads
        </p>
        <p className=" m-0  text-x-small-semibold text-neutral-600 ">(clone)</p>
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
        <div className="toggleDarkmode">
          <TopDropDownMenu />
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
