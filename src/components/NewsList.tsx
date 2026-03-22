import type { NewsItemType } from '../lib/types';
import { NewsItem } from './NewsItem';

type Props = {
  news: NewsItemType[];
};

export function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>Engar fréttir fundust.</p>;
  }

  return (
    <section className="news-list">
      {news.map((item) => (
        <NewsItem key={item.id} news={item} />
      ))}
    </section>
  );
}