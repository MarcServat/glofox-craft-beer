import React, { useState } from "react";
import { BASE_URL_API, GET_BEERS } from "../constants";
import useFetch from "./useFetch";
import { PunkApi } from "../types/api";

interface UseGetBeers {
  params?: Record<string, string>;
  onSuccess?: (response: PunkApi[]) => void;
  onError?: () => void;
}

function useGetBeers(props: UseGetBeers) {
  const [beerList, setBeerList] = useState<PunkApi[]>([]);
  const [error, setError] = useState("");

  const { loading, refetch } = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS,
    params: props.params,
    onSuccess: (response) => {
      setBeerList(response);
      props.onSuccess && props.onSuccess(response);
    },
    onError: () => {
      setError("Couldn't fetch the beer's list");
      props.onError && props.onError();
    },
  });

  return { loading, error, beerList, refetch };
}

export default useGetBeers;
