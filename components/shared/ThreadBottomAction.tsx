"use client";
import { containsKr, containsKrForClient } from "@/lib/utils";
import { useTheme } from "next-themes";
// import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Link as LLink,
  Send,
  Share,
  Heart,
  MessageCircle,
  HeartHandshake,
  Repeat,
  LinkIcon,
  Share2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
  name: string;
  isComment?: boolean;
  comments: number; //array
}
export const ThreadBottomAction = ({
  isComment,
  name,
  id,
  comments,
}: Props) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const krRes = containsKrForClient(pathname);
  const intl = useTranslations("ThreadBottomAction");
  console.log("pathname:::::::;", { id });
  // var imgPath = theme === "dark" ? "white" : "dark";
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: `http://localhost:3000/thread/${id}`,
  };

  return (
    <div className={`${isComment && "mb-10"}mt-5 flex flex-col gap-3`}>
      <div className="flex gap-3.5">
        <HeartHandshake
          fill={liked ? "#dc2626" : "none"}
          className="w-5 h-5 dark:text-light-1"
        />
        <Repeat className="w-5 h-5 dark:text-light-1" />
        <Link href={`/thread/${id}`}>
          <MessageCircle className="w-5 h-5 dark:text-light-1" />
        </Link>
        {/* <Heart
          fill={liked ? "#dc2626" : "none"}
          className="w-5 h-5 dark:text-light-1"
        /> */}
        {/* <Link href={`/thread/${id}`}>
          <Image
            src={`/assets/new/theme/${imgPath}/active/reply.svg`}
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link> */}
        {/* <Image
          src={`/assets/new/theme/${imgPath}/active/heart-gray.svg`}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        /> */}
        {/* <Image
          src={`/assets/new/theme/${imgPath}/active/repost.svg`}
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        /> */}
        {/* <Image
          src={`/assets/new/theme/${imgPath}/active/share.svg`}
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        /> */}

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen((prev) => !prev);
            }}
          >
            <Send className="w-[18px] h-[18px] dark:text-light-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-none dark:bg-neutral-900"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigator.clipboard.writeText(shareData.url);
                //   toast({
                //     title: name + " has been blocked",
                //   });
                setOpen(false);
              }}
              className="userDropDownSub !text-red-500 dark:bg-neutral-900"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {intl("link")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                //   toast({
                //     title: name + " has been reported",
                //   });
                setOpen(false);
              }}
              className="userDropDownSub2  dark:bg-neutral-900"
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              {intl("share")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isComment && comments > 0 && (
        <Link href={`/thread/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {krRes ? (
              <>답글 {comments}개</>
            ) : (
              <>
                {comments} repl{comments > 1 ? "ies" : "y"}
              </>
            )}
          </p>
        </Link>
      )}
    </div>
  );
};
