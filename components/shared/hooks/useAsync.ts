import { useEffect, useState, useRef, useCallback } from 'react';

interface AsyncState<T> {
  loading: boolean;
  error?: Error | null;
  data?: T;
}

/**
 * Hook for managing async operations
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  dependencies: any[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    loading: immediate,
    error: null,
    data: undefined,
  });

  const executeAsync = useCallback(
    async () => {
      setState({ loading: true, error: null, data: undefined });
      try {
        const response = await asyncFunction();
        setState({ loading: false, data: response });
        return response;
      } catch (error) {
        setState({
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      executeAsync();
    }
  }, dependencies);

  return { ...state, execute: executeAsync };
}
