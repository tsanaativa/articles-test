import AvatarCard from "@/components/common/AvatarCard";
import ShareModal from "@/components/features/article-detail/ShareModal";
import { fetchArticleById } from "@/services/articles";
import { Article } from "@/types/Article";
import {
  getProcessedArticleContent,
  stripHtmlTags,
} from "@/utils/articleContent";
import { formatDateTime } from "@/utils/formatter";
import { getDummyImage } from "@/utils/getDummy";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: { id: number; slug: string };
};

const getArticle = cache(async (id: number) => {
  let article: Article = {
    id: id,
    slug: "",
    title: "",
    content: "",
    categories: [],
    created_at: "",
    updated_at: "",
  };
  try {
    article = await fetchArticleById(id);
  } catch (err: any) {
    if (err.toString().includes("404")) {
      notFound();
    } else {
      throw new Error(err.toString());
    }
  }
  return article;
});

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const article: Article = await getArticle(id);

  return {
    title: article.title,
    description: stripHtmlTags(article.content),
    openGraph: {
      images: [
        {
          url: getDummyImage(id),
        },
      ],
    },
  };
}

export default async function ArticleDetailPage({ params: { id } }: Props) {
  const article: Article = await getArticle(id);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <div className="relative w-full h-[240px] md:h-[320px] -mt-1 md:mt-3">
        <Image
          src={getDummyImage(id)}
          alt={article.title}
          priority
          width={400}
          height={400}
          className="object-cover w-full h-[240px] md:h-[320px]"
        />
      </div>
      <div className="flex flex-col gap-5 px-3 pb-3 md:px-0 md:pb-5">
        {article.categories && (
          <div className="badge-container">
            {article.categories.map((cat, idx) => (
              <div key={idx} className="badge">
                {cat.name}
              </div>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-semibold">{article.title}</h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AvatarCard article={article} />
            <div className="text-xs flex gap-2">
              <span>·</span>
              {formatDateTime(new Date(article.created_at))}
              {article.created_at !== article.updated_at && "(edited)"}
            </div>
          </div>
          <ShareModal article={article} />
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: getProcessedArticleContent(article.content),
          }}
          className="flex flex-col gap-3"
        />
      </div>
    </div>
  );
}
