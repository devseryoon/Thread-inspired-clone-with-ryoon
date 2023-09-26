"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  isComment?: boolean;
  comments: number; //array
}
export const ThreadBottomAction = ({ isComment, id, comments }: Props) => {
  const { theme } = useTheme();
  var imgPath = theme === "dark" ? "white" : "dark";
  return (
    <div className={`${isComment && "mb-10"}mt-5 flex flex-col gap-3`}>
      <div className="flex gap-3.5">
        <Image
          src={`/assets/new/theme/${imgPath}/active/heart-gray.svg`}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <Link href={`/thread/${id}`}>
          <Image
            src={`/assets/new/theme/${imgPath}/active/reply.svg`}
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Image
          src={`/assets/new/theme/${imgPath}/active/repost.svg`}
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <Image
          src={`/assets/new/theme/${imgPath}/active/share.svg`}
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>
      {isComment && comments > 0 && (
        <Link href={`/thread/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments} replies
          </p>
        </Link>
      )}
    </div>
  );
};
