export type Author = {
  id: number;
  name: string;
  slug?: string;
};

export type NewsItemType = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  text: string;
  created?: string;
  updated?: string;
  author?: Author | null;
};

export type NewsResponse = {
  items: NewsItemType[];
  total?: number;
  limit?: number;
  offset?: number;
};

export type ApiErrorResponse = {
  error?: string;
  errors?: string[];
  message?: string;
};