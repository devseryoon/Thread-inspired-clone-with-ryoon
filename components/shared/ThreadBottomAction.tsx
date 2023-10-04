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
} from "lucide-react";

interface Props {
  id: string;
  isComment?: boolean;
  comments: number; //array
}
export const ThreadBottomAction = ({ isComment, id, comments }: Props) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [liked, setLiked] = useState(false);
  const krRes = containsKrForClient(pathname);
  var imgPath = theme === "dark" ? "white" : "dark";
  return (
    <div className={`${isComment && "mb-10"}mt-5 flex flex-col gap-3`}>
      <div className="flex gap-3.5">
        {/* <Heart
          fill={liked ? "#dc2626" : "none"}
          className="w-5 h-5 dark:text-light-1"
        /> */}
        <HeartHandshake
          fill={liked ? "#dc2626" : "none"}
          className="w-5 h-5 dark:text-light-1"
        />
        <Repeat className="w-5 h-5 dark:text-light-1" />
        <Link href={`/thread/${id}`}>
          <MessageCircle className="w-5 h-5 dark:text-light-1" />
        </Link>

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
        <Send className="w-[18px] h-[18px] dark:text-light-1" />
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
