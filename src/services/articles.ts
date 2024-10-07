import {
  Article,
  ArticleSearchParams,
  ArticlesResponse,
} from "@/types/Article";
import { Response } from "@/types/Response";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchArticles = async (params: ArticleSearchParams) => {
  try {
    const res = await axios.get<ArticlesResponse>(`${BACKEND_URL}/articles`, {
      params: params,
    });
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(String(error));
  }
};

export const fetchArticleById = async (id: number) => {
  try {
    const res = await axios.get<Response<Article>>(
      `${BACKEND_URL}/articles/${id}`
    );
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(String(error));
  }
};
