import { memo } from "react";

const Pagination = memo(
  ({
    currentPage,
    totalPages,
    windowStart,
    windowEnd,
    onPageChange,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
  }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: windowEnd - windowStart }, (_, i) => windowStart + i);

    return (
      <nav aria-label="Pagination">
        <ul className="pagination mb-2">
          <li className={`page-item ${!hasPrev ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Prev
            </button>
          </li>
          {windowStart > 0 && (
            <li className="page-item">
              <button type="button" className="page-link" onClick={() => onPageChange(0)}>
                1
              </button>
            </li>
          )}
          {windowStart > 1 && (
            <li className="page-item disabled">
              <span className="page-link">&hellip;</span>
            </li>
          )}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          {windowEnd < totalPages - 1 && (
            <li className="page-item disabled">
              <span className="page-link">&hellip;</span>
            </li>
          )}
          {windowEnd < totalPages && (
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(totalPages - 1)}
              >
                {totalPages}
              </button>
            </li>
          )}
          <li className={`page-item ${!hasNext ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={onNext}
              disabled={!hasNext}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;