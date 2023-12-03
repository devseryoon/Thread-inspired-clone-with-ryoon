import LangContext from "@/lib/context/LangContext";
import Image from "next/image";
import { useContext } from "react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  followers: number;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  followers,
  type,
}: Props) => {
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate.ProfileHeader;
  return (
    <div className="flex w-full flex-col justify-start ">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-row items-center gap-3 justify-between">
        <div className="flex-1">
          <h2 className="text-left text-heading3-bold   dark:text-light-1">
            {username}
          </h2>
          <div className="flex flex-row items-center">
            <p className="text-small-medium  text-neutral-400 mr-2">{name}</p>
            <div className="badge dark:bg-neutral-900">threads.net</div>
          </div>
        </div>
        <div className="relative h-20 w-20 object-cover">
          <Image
            // onClick={() => {}}
            src={imgUrl}
            alt="profile_img"
            fill
            className=" cursor-pointer  rounded-full object-cover shadow-2xl"
          />
        </div>
      </div>
      {/* </div> */}
      {/** TODO: Community */}
      <p className="mt-4 max-w-lg text-base-regular dark:text-light-2 biotext">
        {bio}
      </p>
      <div
        // onClick={() => {
        //   console.log("팔로워 목록뜨는 컴포넌트 만들어야 함");
        // }}
        className="mt-4  w-full flex flex-row justify-between "
      >
        <p className=" text-base-regular text-neutral-300 dark:text-light-2 biotext">
          {followers} {intl.followers}
        </p>
        <Image
          alt="instagram"
          width={24}
          height={24}
          className="object-contain"
          src="/assets/new/theme/dark/instagram.svg"
        />
      </div>
      <div className=" h-0.6 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
