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
const TopBar = () => {
  // const temopUser = useUser();
  // console.log("temopUser: ", temopUser);

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
        <OrganizationSwitcher
          // organizationProfileMode={"navigation"}
          hidePersonal={false}
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
              // avatarImage:
            },
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
