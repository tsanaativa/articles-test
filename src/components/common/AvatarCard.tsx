import { Article } from "@/types/Article";
import { getDummyAuthor, getDummyAvatar } from "@/utils/getDummy";
import Image from "next/image";
import { FC } from "react";

type Props = {
  author?: string;
  avatar?: string;
  article: Article;
};

const AvatarCard: FC<Props> = ({ article }) => {
  const dummyAuthor: string = getDummyAuthor(article.id);
  const dummyAvatar: string = getDummyAvatar(article.id);

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-7 h-7 overflow-hidden rounded-full">
        <Image
          src={dummyAvatar}
          alt={dummyAuthor}
          loading="lazy"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      <span className="font-semibold text-xs">{dummyAuthor}</span>
    </div>
  );
};

export default AvatarCard;
