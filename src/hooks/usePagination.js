import { useEffect, useMemo, useState } from "react";

const PAGE_WINDOW = 5;

export const usePagination = (items = [], pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(currentPage, totalPages - 1);

  const pageItems = useMemo(() => {
    const start = safePage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const windowStart = Math.max(
    0,
    Math.min(safePage - Math.floor(PAGE_WINDOW / 2), totalPages - PAGE_WINDOW)
  );
  const windowEnd = Math.min(totalPages, windowStart + PAGE_WINDOW);

  const goToPage = (page) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const goNext = () => goToPage(safePage + 1);
  const goPrev = () => goToPage(safePage - 1);

  const resetPage = () => setCurrentPage(0);

  return {
    currentPage: safePage,
    totalPages,
    pageItems,
    windowStart,
    windowEnd,
    goToPage,
    goNext,
    goPrev,
    resetPage,
    hasNext: safePage < totalPages - 1,
    hasPrev: safePage > 0,
  };
};