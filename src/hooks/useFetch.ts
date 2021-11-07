import { useCallback, useEffect, useRef, useState } from 'react';

type UseFetchOpts = {
  method?: 'get' | 'put' | 'post';
  /**
   * Control when the request is dispatched by invoking the 'dispatch' function returned by the hook
   */
  lazy?: boolean;
  /**
   * Adds a timeout to each request, useful for dispatching requests from user input (i.e. searching)
   */
  debounce?: number;
};

type UseFetchReturn<ResponseType> = {
  loading: boolean;
  data: ResponseType | null;
  dispatch?: () => Promise<void>;
  error: Response | null;
};

/**
 * A hook to simplify handling async fetch requests from components
 */
export function useFetch<ResponseType>(url: string, opts: UseFetchOpts = {}): UseFetchReturn<ResponseType> {
  const { method = 'get', lazy = method != 'get', debounce } = opts;

  const [error, setError] = useState<Response | null>(null);
  const [data, setData] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(!lazy);

  const debounceTimeoutRef = useRef<number | null>(null);

  const dispatch = useCallback(async () => {
    const makeRequest = async () => {
      setError(null);
      setLoading(true);

      const response = await fetch(url);

      setLoading(false);

      if (response.ok) {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          setData(await response.json());
        } else {
          console.error('Unable to handle non-JSON response', response);
        }
      } else {
        setError(response);
      }
    };

    if (typeof debounce === 'number') {
      if (debounceTimeoutRef.current !== null) clearTimeout(debounceTimeoutRef.current);

      debounceTimeoutRef.current = window.setTimeout(makeRequest, debounce);
    } else {
      makeRequest();
    }
  }, [url, method]);

  useEffect(() => {
    // Don't automatically dispatch the request if the consumer wants to call it by themself
    if (lazy) return;

    dispatch();

    return () => {
      // If the parent component de-mounts and we're debouncing requests, make sure any pending request
      // is cancelled otherwise stateful operations might be applied to an unmounted component
      if (debounceTimeoutRef.current !== null) clearTimeout(debounceTimeoutRef.current);
    };
  }, [dispatch, lazy]);

  return { loading, data, error, dispatch };
}
