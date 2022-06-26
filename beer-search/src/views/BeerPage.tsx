import React, { useState } from "react";
import Pod from "../components/Pod/Pod";
import SearchBar from "../components/SearchBar/SearchBar";
import Row from "../components/Row/Row";
import { PunkApi } from "../types/api";
import GenericError from "../components/GenericError/GenericError";
import Loader from "../components/Loader/Loader";
import useGetBeers from "../hooks/useGetBeers";
import Button from "../components/Button/Button";
import "./BeerPage.css";
import useFetch from "../hooks/useFetch";
import {BASE_URL_API, GET_BEERS, RANDOM} from "../constants";

const BeerPage = () => {
  const [filteredBeerList, setFilteredBeerList] = useState<PunkApi[]>([]);
  const [randomBeer, setRandomBeer] = useState<PunkApi>();
  const [error, setError] = useState("");
  const {
    loading: isBeerListLoading,
    error: beerListError,
    beerList,
    refetch: refetchBeer,
  } = useGetBeers({
    onSuccess: (response) => {
      setFilteredBeerList(response);
    },
  });

  const {loading, refetch} = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    onSuccess: (response) => {
      if (response.length > 1) {
        setRandomBeer(response[Math.floor(Math.random() * response.length)])
      } else {
        setRandomBeer(response[0])
      }
    },
    onError: () => {
      setError("No random beer");
    }
  });

  const onChange = (value: string, by: string) => {
    const filterBeers = beerList.filter((beer) => {
      if (beer.name.toLowerCase().includes(value.toLowerCase())) return beer;
    });
    setFilteredBeerList(filterBeers);
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
                  <Button
                    content="Another Beer"
                    onClick={() => refetch()}
                  />
                  <Button
                    content="Random non alcoholic beer"
                    onClick={() => {
                      refetch({abv_lt: "1"}, BASE_URL_API + GET_BEERS);
                    }}
                  />
                </section>
              }
            />
          )}
        </Loader>
      </GenericError>
      <SearchBar
        onChange={onChange}
        onSubmit={() => {
          console.log("onSubmit");
        }}
      />
      <GenericError key="beer-list-error" error={beerListError}>
        <Loader key="beer-list-loader" loading={isBeerListLoading}>
          <h1>Search Results</h1>
          {filteredBeerList.map((beer) => (
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
