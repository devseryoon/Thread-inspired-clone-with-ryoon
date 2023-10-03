import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  key: string;
  href: string;
  src: string;
  name: string;
}
const ActivityCard = ({ key, href, src, name }: Props) => {
  const intl = useTranslations("ActivityCard");
  return (
    <Link key={key} href={`/thread/${href}`}>
      <article className="activity-card">
        <Image
          src={src}
          alt="Profile pic"
          width={20}
          height={20}
          className="rounded-full object-cover"
        />
        <p className="!text-small-regular text-light-1">
          <span className="mr-1 text-purple-500">{name}</span>
          {intl("message")}
        </p>
      </article>
    </Link>
  );
};

export default ActivityCard;
