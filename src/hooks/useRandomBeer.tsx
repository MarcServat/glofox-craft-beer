import { useState } from "react";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import useFetch from "./useFetch";
import { PunkApi } from "../types/api";
import useGetBeers from "./useGetBeers";

interface UseRandomBeer {
  params?: Record<string, string>;
  onSuccess?: (response: PunkApi) => void;
  onError?: () => void;
}

function useRandomBeer(props?: UseRandomBeer) {
  const [randomBeer, setRandomBeer] = useState<PunkApi>();
  const [error, setError] = useState("");

  const { loading: loadingRandomBeer, refetch: refetchRandomBeer } = useFetch<
    [PunkApi]
  >({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    params: props?.params,
    onSuccess: (response) => {
      setRandomBeer(response[0]);
      console.log(response);
      props?.onSuccess && props.onSuccess(response[0]);
    },
    onError: () => {
      setError("Couldn't fetch a random beer");
      props?.onError && props.onError();
    },
  });

  const { loading: loadingNonAlcoholicBeer, refetch: refetchNonAlcoholicBeer } =
    useGetBeers({
      params: { abv_lt: "1" },
      onSuccess: (response) => {
        setRandomBeer(response[0]);
      },
      onError: () => {
        setError("Couldn't fetch a non alcoholic beer");
        props?.onError && props.onError();
      },
    });

  return {
    loadingRandomBeer,
    loadingNonAlcoholicBeer,
    error,
    randomBeer,
    refetchRandomBeer,
    refetchNonAlcoholicBeer,
  };
}

export default useRandomBeer;
