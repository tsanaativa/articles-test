import { fetchArticles } from "@/services/articles";
import { Category } from "@/types/Category";
import ArticleCard from "./ArticleCard";

type Props = {
  category: Category;
};

const ByCategoryCard = async ({ category }: Props) => {
  const response = await fetchArticles({
    limit: 5,
    page: 1,
    category_id: category.id,
  });
  const articles = response.data;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base md:text-lg font-semibold">{category.name}</h3>
      <hr className="hidden md:block" />
      <div className="flex overflow-x-auto md:flex-col gap-4 md:mt-2">
        {articles.map((article, idx) => (
          <ArticleCard article={article} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ByCategoryCard;
