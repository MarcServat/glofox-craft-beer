import React, { useEffect, useState } from "react";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import useFetch from "./useFetch";
import { PunkApi } from "../types/api";
import GETPunkAPI from "../mocks/GETPunkAPI.json";

interface UseGetBeer {
  onSuccess?: (response: PunkApi[]) => void;
  onError?: () => void;
}

function useGetBeer(props: UseGetBeer) {
  const [beerList, setBeerList] = useState<PunkApi[]>([]);
  const [error, setError] = useState("");

  const { loading } = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS,
    onSuccess: (response) => {
      setBeerList(GETPunkAPI as unknown as PunkApi[]); // setBeerList(response);
      props.onSuccess && props.onSuccess(response);
    },
    onError: () => {
      setError("Couldn't fetch the beer's list");
      props.onError && props.onError();
    },
  });

  return { loading, error, beerList };
}

export default useGetBeer;
