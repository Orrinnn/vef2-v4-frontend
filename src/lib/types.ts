export type Author = {
  id: number;
  name: string;
  email?: string;
  slug?: string;
};

export type NewsItemType = {
  id: number;
  title: string;
  slug: string;
  intro: string;
  content: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorId?: number;
  author?: Author | null;
};

export type PaginationInfo = {
  total: number;
  limit: number;
  offset: number;
  count: number;
};

export type NewsResponse = {
  data: NewsItemType[];
  pagination: PaginationInfo;
};

export type ApiErrorResponse = {
  error?: string;
  errors?: string[];
  message?: string;
};
