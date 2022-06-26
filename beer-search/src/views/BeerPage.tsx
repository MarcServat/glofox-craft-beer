import React, { useState } from "react";
import Pod from "../components/Pod/Pod";
import SearchBar, {
  FormValues,
  Option,
} from "../components/SearchBar/SearchBar";
import Row from "../components/Row/Row";
import { PunkApi } from "../types/api";
import GenericError from "../components/GenericError/GenericError";
import Loader from "../components/Loader/Loader";
import useGetBeers from "../hooks/useGetBeers";
import Button from "../components/Button/Button";
import "./BeerPage.css";
import useFetch from "../hooks/useFetch";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";

const BeerPage = () => {
  const [randomBeer, setRandomBeer] = useState<PunkApi>();
  const [error, setError] = useState("");
  const {
    loading: isBeerListLoading,
    error: beerListError,
    beerList,
    refetch: refetchBeer,
  } = useGetBeers();

  const meetRequirements = (beer: PunkApi) => {
    if (beer.name && beer.description) {
      return beer;
    }
    refetch();
  };

  const { loading, refetch } = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    onSuccess: (response) => {
      if (response.length > 1) {
        const selectedBeer =
          response[Math.floor(Math.random() * response.length)];
        const beer = meetRequirements(selectedBeer);
        setRandomBeer(beer);
      }
      if (response.length === 1) {
        const beer = meetRequirements(response[0]);
        setRandomBeer(beer);
      }
    },
    onError: () => {
      setError("No random beer");
    },
  });

  const onSubmit = (params: FormValues) => {
    refetchBeer(params);
  };

  return (
    <>
      <GenericError key="random-beer-error" error={error}>
        <Loader key="random-beer-loader" loading={loading}>
          {randomBeer && (
            <Pod
              title={randomBeer.name}
              img={randomBeer.image_url}
              content={randomBeer.description}
              actions={
                <section className="actions">
                  <Button content="Another Beer" onClick={() => refetch()} />
                  <Button
                    content="Random non alcoholic beer"
                    onClick={() => {
                      refetch({ abv_lt: "1" }, BASE_URL_API + GET_BEERS);
                    }}
                  />
                </section>
              }
            />
          )}
        </Loader>
      </GenericError>
      <h1>Search</h1>
      <SearchBar onSubmit={onSubmit} />
      <GenericError key="beer-list-error" error={beerListError}>
        <Loader key="beer-list-loader" loading={isBeerListLoading}>
          <h1>Search Results</h1>
          {beerList.map((beer) => (
            <Row
              key={beer.id}
              img={beer.image_url}
              name={beer.name}
              content={beer.description}
            />
          ))}
        </Loader>
      </GenericError>
    </>
  );
};

export default BeerPage;
