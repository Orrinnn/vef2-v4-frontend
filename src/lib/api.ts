import type {
  ApiErrorResponse,
  Author,
  NewsItemType,
  NewsResponse,
} from './types';

const BASE_URL = 'http://localhost:3000';

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    let errorMessage = 'Villa kom upp við að sækja gögn.';
    try {
      const data = (await response.json()) as ApiErrorResponse;
      errorMessage = data.message || data.error || errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

export async function fetchNews(
  limit = 10,
  offset = 0,
): Promise<NewsResponse> {
  return getJson<NewsResponse>(
    `${BASE_URL}/news?limit=${limit}&offset=${offset}`,
  );
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItemType> {
  return getJson<NewsItemType>(`${BASE_URL}/news/${slug}`);
}

export async function fetchAuthors(): Promise<Author[]> {
  const response = await getJson<{ data: Author[] }>(
    `${BASE_URL}/authors`,
  );
  return response.data;
}

type CreateNewsInput = {
  title: string;
  intro: string;
  content: string;
  authorId: number;
};

export async function createNews(input: CreateNewsInput): Promise<NewsItemType> {
  const response = await fetch(`${BASE_URL}/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    let errorMessage = 'Ekki tókst að búa til frétt.';
    try {
      const data = (await response.json()) as ApiErrorResponse;
      if (data.errors?.length) {
        errorMessage = data.errors.join(', ');
      } else {
        errorMessage = data.message || data.error || errorMessage;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return (await response.json()) as NewsItemType;
}