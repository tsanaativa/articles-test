export type Metadata = {
  limit: number;
  page: number;
  total_docs: number;
  total_pages: number;
  has_next_page: boolean;
};

export type Response<T> = {
  code: number;
  data: T;
};

export type ListResponse<T> = Response<{
  data: T[];
  metadata: Metadata;
}>;
