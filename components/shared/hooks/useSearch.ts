import { useState, useCallback } from 'react';

/**
 * Hook for managing search state
 */
export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const reset = useCallback(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return {
    query,
    handleSearch,
    handleClear,
    reset,
    isEmpty: query.trim().length === 0,
  };
}
