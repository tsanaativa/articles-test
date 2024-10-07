import { fetchCategories } from "@/services/category";
import ByCategoryCard from "./ByCategoryCard";
import { Category } from "@/types/Category";
import { getRandomItems } from "@/utils/getRandom";

const ByCategoriesSection = async () => {
  const categories: Category[] = await fetchCategories();
  const displayedCategories = getRandomItems<Category>(categories);

  return (
    <div className="flex flex-col gap-6">
      {displayedCategories.map((cat, idx) => (
        <ByCategoryCard category={cat} key={idx} />
      ))}
    </div>
  );
};

export default ByCategoriesSection;
