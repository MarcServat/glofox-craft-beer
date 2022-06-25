import React, { useEffect, useState } from "react";

interface UseFetchProps<T> {
  url: string;
  onSuccess?: (response: T) => void;
  onError?: () => void;
}

function useFetch<T>(props: UseFetchProps<T>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        props.onSuccess && props.onSuccess(res as unknown as T);
      })
      .catch(() => {
        setLoading(false);
        props.onError && props.onError();
      });
  }, []);

  return {
    loading,
  };
}

export default useFetch;
