import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsBySlug } from '../lib/api';
import type { NewsItemType } from '../lib/types';

export function NewsPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<NewsItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadNews() {
      if (!slug) {
        setErrorMessage('Frétt fannst ekki.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchNewsBySlug(slug);
        setNews(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Frétt fannst ekki.');
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNews();
  }, [slug]);

  if (loading) {
    return <p>Sæki frétt...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!news) {
    return <p>Frétt fannst ekki.</p>;
  }

  return (
    <article className="news-item">
      <h2>{news.title}</h2>
      <p>
        <strong>Útdráttur:</strong> {news.intro}
      </p>
      <p>
        <strong>Höfundur:</strong> {news.author?.name ?? 'Óþekktur höfundur'}
      </p>
      <div>
        <strong>Texti:</strong>
        <p>{news.content}</p>
      </div>
    </article>
  );
}