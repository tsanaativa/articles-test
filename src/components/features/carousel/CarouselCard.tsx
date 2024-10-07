import AvatarCard from "@/components/common/AvatarCard";
import { DUMMY_AUTHORS, DUMMY_AVATARS } from "@/constants/dummy";
import { Article } from "@/types/Article";
import { getDummyImage } from "@/utils/getDummy";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: Article;
};

const CarouselCard = ({ article }: Props) => {
  return (
    <Link className="w-full h-full" href={`/${article.id}/${article.slug}`}>
      <div className="relative w-full h-full max-h-[220px] sm:max-h-[280px] md:max-h-[360px]">
        <Image
          src={getDummyImage(article.id)}
          alt={article.title}
          width={600}
          height={600}
          className="object-cover w-full h-full hover:scale-125 transition-all duration-300 ease-in-out"
        />
        <div className="w-full absolute py-4 px-4 sm:py-6 sm:px-7 bottom-0 text-white bg-gradient-to-t from-gray-900">
          <div className="flex flex-col gap-2">
            <span className="text-xs ">Category</span>
            <span className="text-xl sm:text-3xl font-semibold line-clamp-3">
              {article.title}
            </span>
            <div className="flex items-center gap-2">
              <AvatarCard
                author={DUMMY_AUTHORS[0]}
                avatar={DUMMY_AVATARS[0]}
                article={article}
              />
              <div className="text-xs flex gap-2">
                <span>·</span>
                12 hours ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
