import { Link } from 'react-router-dom';
import type { NewsItemType } from '../lib/types';

type Props = {
  news: NewsItemType;
};

export function NewsItem({ news }: Props) {
  return (
    <article className="news-item">
      <h2>
        <Link to={`/news/${news.slug}`}>{news.title}</Link>
      </h2>
      <p>{news.intro}</p>
      <p>
        <strong>Höfundur:</strong> {news.author?.name ?? 'Óþekktur höfundur'}
      </p>
    </article>
  );
}