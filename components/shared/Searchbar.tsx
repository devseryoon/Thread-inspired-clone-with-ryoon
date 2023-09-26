"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="flex gap-1 rounded-lg border border-neutral-200 bg-neutral-100 dark:bg-neutral-900 dark:border-none  px-4 py-2 items-center">
      {/* <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      /> */}
      <Search
        color={`${theme === "dark" ? "#d4d4d4" : "#d4d4d4"}`}
        style={{ width: 24, height: 24 }}
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${routeType !== "/search" ? "Search..." : "Search..."}`}
        className="no-focus border-none  text-base-regular placeholder:text-neutral-300 dark:text-neutral-200 outline-none !important; bg-neutral-100 dark:bg-neutral-900  dark:placeholder:text-zinc-500"
      />
    </div>
  );
}

export default Searchbar;
