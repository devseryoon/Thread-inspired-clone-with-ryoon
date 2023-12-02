"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { containsKrForClient } from "@/lib/utils";
import {
  HeartHandshake,
  LinkIcon,
  MessageCircle,
  Repeat,
  Send,
  Share2Icon,
} from "lucide-react";
import translate from "@/messages/en.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  // const { theme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const krRes = containsKrForClient(pathname);
  const intl = translate["ThreadBottomAction"];
  const { toast } = useToast();
  // console.log("pathname:::::::;", id);
  // var imgPath = theme === "dark" ? "white" : "dark";
  const shareData = {
    title: intl.share_title,
    text: intl.share_text,
    url: `${process.env.SHARE_URL}/thread/${id}`,
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

        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // setOpen((prev) => !prev);
            }}
          >
            <Send className="w-[18px] h-[18px] dark:text-light-1 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="border-none dark:bg-neutral-900"
          >
            <DropdownMenuItem
              onClick={() => {
                // e.stopPropagation();
                // e.preventDefault();
                navigator.clipboard.writeText(shareData.url);

                toast({
                  title: shareData.title,
                  description: shareData.text,
                  // action: <ToastAction altText="close">close</ToastAction>,
                });
              }}
              className="userDropDownSub !text-red-500 dark:bg-neutral-900"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {intl.link}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                {
                  isMobile && navigator.share(shareData);
                }
                {
                  !isMobile &&
                    toast({
                      variant: "destructive",
                      title: "Error!",
                      description: intl.share_only_mobile,
                    });
                }
              }}
              className="userDropDownSub2  dark:bg-neutral-900"
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              {intl.share}
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
