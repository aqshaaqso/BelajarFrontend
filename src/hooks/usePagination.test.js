import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  const items = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  it("returns the first page of items", () => {
    const { result } = renderHook(() => usePagination(items, 5));

    expect(result.current.pageItems).toHaveLength(5);
    expect(result.current.pageItems[0].id).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it("navigates between pages", () => {
    const { result } = renderHook(() => usePagination(items, 5));

    act(() => {
      result.current.goNext();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageItems[0].id).toBe(6);
    expect(result.current.hasPrev).toBe(true);

    act(() => {
      result.current.goPrev();
    });

    expect(result.current.currentPage).toBe(0);
  });

  it("resets to the first page when items change", () => {
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data, 5),
      { initialProps: { data: items } }
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    rerender({ data: items.slice(0, 3) });

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pageItems).toHaveLength(3);
  });
});