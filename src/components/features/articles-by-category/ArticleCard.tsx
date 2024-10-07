import { Article } from "@/types/Article";
import { getDummyImage } from "@/utils/getDummy";
import { getRandomNumber } from "@/utils/getRandom";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  return (
    <div>
      <Link href={`/${article.id}/${article.slug}`}>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="w-2/5">
            <div className="relative min-w-32 md:min-w-20 lg:min-w-24 xl:min-w-28 h-[5.5rem] overflow-hidden rounded">
              <Image
                src={getDummyImage(article.id)}
                alt={article.title}
                loading="lazy"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-3/5 pb-3 md:py-2">
            <h4 className="text-sm font-semibold line-clamp-2">
              {article.title}
            </h4>
            <span className="text-xs text-gray-500">
              {getRandomNumber(2, 24)} hours ago
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
