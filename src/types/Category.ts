import { Response } from "./Response";

export type Category = {
  id: number;
  name: string;
};

export type CategoriesResponse = Response<Category[]>;
