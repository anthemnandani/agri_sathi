import { useEffect, useState } from 'react';

interface FetchState<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

/**
 * Hook for fetching data from API
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    error: undefined,
    data: undefined,
  });

  useEffect(() => {
    let aborted = false;

    const fetchData = async () => {
      try {
        setState({ loading: true });
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        if (!aborted) setState({ data, loading: false });
      } catch (error) {
        if (!aborted) {
          setState({
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      }
    };

    fetchData();
    return () => {
      aborted = true;
    };
  }, [url, options]);

  return state;
}
