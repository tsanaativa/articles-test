import { CategoriesResponse } from "@/types/Category";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async () => {
  try {
    const res = await axios.get<CategoriesResponse>(`${BACKEND_URL}/categories`);
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(String(error));
  }
};
