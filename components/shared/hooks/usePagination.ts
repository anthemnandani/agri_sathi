import { useState, useCallback } from 'react';

/**
 * Hook for managing pagination state
 */
export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage));
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(Math.min(Math.max(1, newLimit), 100));
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    reset,
  };
}
