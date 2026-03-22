import { useEffect, useState } from 'react';
import { NewsList } from '../components/NewsList';
import { Pagination } from '../components/Pagination';
import { fetchNews } from '../lib/api';
import type { NewsItemType } from '../lib/types';

const LIMIT = 5;

export function HomePage() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setErrorMessage('');

      try {
        const offset = (page - 1) * LIMIT;
        const response = await fetchNews(LIMIT, offset);

        console.log('NEWS RESPONSE:', response);

        setNews(Array.isArray(response.data) ? response.data : []);
        setHasNext(
          response.pagination.offset + response.pagination.count <
            response.pagination.total,
        );
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Ekki tókst að sækja fréttir.');
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNews();
  }, [page]);

  return (
    <section>
      <h2>Allar fréttir</h2>

      {loading && <p>Sæki fréttir...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!loading && !errorMessage && <NewsList news={news} />}

      <Pagination
        page={page}
        hasPrevious={page > 1}
        hasNext={hasNext}
        onPrevious={() => setPage((current) => current - 1)}
        onNext={() => setPage((current) => current + 1)}
      />
    </section>
  );
}