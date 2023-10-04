import { containsKr, formatDateString } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ThreadBottomAction } from "../shared/ThreadBottomAction";
import UserThreadThreeDots from "../shared/UserThreadThreeDots";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[]; //array
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  // const intl = useTranslations("ThreadCard");
  const headersList = headers();
  const krRes = containsKr(headersList);

  return (
    <article
      className={`"flex w-full flex-col  ${
        isComment ? "mt-10 px-0 xs:px-7 pb-4" : "threadcard"
      } border-b dark:border-b-zinc-800 `}
    >
      <div className="flex flex-items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile_pic"
                // style={{ height: "2.75rem", width: "2.75rem" }}
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex w-full flex-col">
            <Link
              href={`/profile/${author.id}`}
              className="w-full flex flex-row justify-between"
            >
              <h4 className="cursor-pointer text-base-semibold text-black dark:text-light-1">
                {author.name}
              </h4>
              <UserThreadThreeDots
                threadId={JSON.stringify(id)}
                currentUserId={currentUserId}
                authorId={author.id}
                parentId={parentId}
                isComment={isComment}
                name={author.name}
              />
            </Link>
            <p className="mt-2 text-small-regular text-black dark:text-light-2 mb-2">
              {content}
            </p>
            <ThreadBottomAction
              name={author.name}
              isComment={isComment}
              id={JSON.stringify(id).replace(/\"/gi, "")}
              comments={comments.length}
            />
          </div>
        </div>
        {/**  TODO:
         *
         * 1.Delete Thread
         * 2.Show comment logos
         */}
        {/* 
        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {krRes ? (
                <>답글 {comments.length}개</>
              ) : (
                <>
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  {/* {t('locale', {locale: cur})} */}
                </>
              )}
            </p>
          </Link>
        </div>
      )}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
