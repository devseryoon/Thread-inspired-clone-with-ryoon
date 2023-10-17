"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  bio: string;
  followers: number;
}

const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  personType,
  followers,
  bio,
}: Props) => {
  const router = useRouter();
  const intl = useTranslations("UserCard");

  const isCommunity = personType === "Community";
  return (
    <Link
      href={`/profile/${id}`}
      className="pl-3 pt-2 flex font-light  mb-0 mt-0 "
    >
      <div className="w-10 h-10 rounded-full bg-neutral-600 mt-1  mr-4  overflow-hidden">
        <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          // style={{ height: 48, width: 48 }}
          className="rounded-full"
        />
      </div>
      <div className="user-card_avatar">
        <div className="">
          <h4 className="font-semibold dark:text-light-1">{name}</h4>
          <p className="text-small-regular  break-words  text-neutral-400 ">
            {" "}
            {bio}
          </p>
          <p className=" text-small-regular dark:text-light-1 leading-7">
            {followers} {intl("followers")}
          </p>
        </div>
        <Button
          // className="user-card_btn"
          variant="outline"
          size="sm"
          className="w-24 dark:bg-neutral-600 bg-none text-black  text-[12px] dark:text-light-1 !important"
          onClick={(e) => {
            e.preventDefault();
            if (isCommunity) {
              router.push(`/communities/${id}`);
            } else {
              router.push(`/profile/${id}`);
            }
          }}
        >
          {intl("view")}
        </Button>
      </div>
    </Link>
  );
};

export default UserCard;
