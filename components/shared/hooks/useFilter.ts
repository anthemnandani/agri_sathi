import { useState, useCallback } from 'react';

/**
 * Hook for managing filter state
 */
export function useFilter(initialFilters: Record<string, any> = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleMultipleFilters = useCallback((newFilters: Record<string, any>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = Object.values(filters).some(v => v !== null && v !== undefined && v !== '');

  return {
    filters,
    handleFilterChange,
    handleMultipleFilters,
    handleClear,
    hasActiveFilters,
  };
}
