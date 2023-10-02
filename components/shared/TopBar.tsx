"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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

const TopBar = () => {
  const router = useRouter();
  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <nav className="topbar  bg-white dark:topbarBg">
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
        {/* <div className="block md:hidden">
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
        </div> */}
        <div
          className={`flex flex-row toggleDarkmode ${
            theme === "dark" ? "text-white " : "text-black"
          }`}
        >
          {/* <Toggle variant="outline" aria-label="Toggle italic">
            en
          </Toggle> */}

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
