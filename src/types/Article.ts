import { Category } from "./Category";
import { ListResponse } from "./Response";

export type Article = {
  id: number;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  categories: Category[];
};

export type ArticleSearchParams = {
  limit: number;
  page: number;
  category_id?: number;
};

export type ArticlesResponse = ListResponse<Article>;
