import React, { useEffect, useState } from "react";

interface UseFetchProps<T> {
  url: string;
  params?: Record<string, string>;
  onSuccess?: (response: T) => void;
  onError?: () => void;
}

function useFetch<T>(props: UseFetchProps<T>) {
  const [loading, setLoading] = useState(true);

  const refetch = (params?: Record<string, string>, newUrl?: string) => {
    const url = new URL(newUrl || props.url);
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then<T>((res) => res.json())
      .then((res) => {
        setLoading(false);
        props.onSuccess && props.onSuccess(res);
      })
      .catch(() => {
        console.log('erorrrrr')
        setLoading(false);
        props.onError && props.onError();
      });
  };

  useEffect(() => {
    refetch(props.params);
  }, []);

  return {
    loading,
    refetch,
  };
}

export default useFetch;
