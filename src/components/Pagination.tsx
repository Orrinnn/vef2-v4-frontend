type Props = {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function Pagination({
  page,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={!hasPrevious}>
        Fyrri síða
      </button>
      <span>Síða {page}</span>
      <button onClick={onNext} disabled={!hasNext}>
        Næsta síða
      </button>
    </div>
  );
}