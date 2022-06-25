import React, { useState } from "react";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import useFetch from "./useFetch";
import { PunkApi } from "../types/api";
import GETPunkAPI from "../mocks/GETPunkAPI.json";

interface UseRandomBeer {
  onSuccess?: (response: PunkApi) => void;
  onError?: () => void;
}

function useRandomBeer(props?: UseRandomBeer) {
  const [randomBeer, setRandomBeer] = useState<PunkApi>();
  const [error, setError] = useState("");

  const { loading } = useFetch<[PunkApi]>({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    onSuccess: (response) => {
      setRandomBeer(GETPunkAPI[0] as unknown as PunkApi); // setRandomBeer(response[0]);
      props?.onSuccess && props.onSuccess(response[0]);
    },
    onError: () => {
      setError("Couldn't fetch a random beer");
      props?.onError && props.onError();
    },
  });

  return { loading, error, randomBeer };
}

export default useRandomBeer;
