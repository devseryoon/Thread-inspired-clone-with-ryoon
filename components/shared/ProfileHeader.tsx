import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-row items-center gap-3 justify-between">
        <div className="flex-1">
          <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
          <div className="flex flex-row">
            {" "}
            <p className="text-base-medium text-neutral-400 mr-2">
              @{username}
            </p>
            <div className="badge">threads.net</div>
          </div>
        </div>
        <div className="relative h-20 w-20 object-cover">
          <Image
            src={imgUrl}
            alt="profile_img"
            fill
            className="rounded-full object-cover shadow-2xl"
          />
        </div>
      </div>
      {/* </div> */}
      {/** TODO: Community */}
      <p className="mt-4 max-w-lg text-base-regular text-light-2 biotext">
        {bio}
      </p>
      <div className="mt-4 h-0.6 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
