import React, { useEffect, useMemo, useState, Suspense } from "react";
import Pod from "../components/Pod/Pod";
import SearchBar from "../components/SearchBar/SearchBar";
import Row from "../components/Row/Row";
import { PunkApi } from "../types/api";
import GenericError from "../components/GenericError/GenericError";
import Loader from "../components/Loader/Loader";
import useGetBeers from "../hooks/useGetBeers";
import useRandomBeer from "../hooks/useRandomBeer";

const BeerPage = () => {
  const [filteredBeerList, setFilteredBeerList] = useState<PunkApi[]>([]);
  const {
    loading: isBeerListLoading,
    error: beerListError,
    beerList,
  } = useGetBeers({
    onSuccess: (response) => {
      setFilteredBeerList(response);
    },
  });
  const {
    loading: isRandomBeerLoading,
    error: randomBeerError,
    randomBeer,
  } = useRandomBeer();

  const onChange = (value: string, by: string) => {
    const filterBeers = beerList.filter((beer) => {
      if (beer.name.toLowerCase().includes(value.toLowerCase())) return beer;
    });
    setFilteredBeerList(filterBeers);
  };
  console.log("render");

  return (
    <>
      <GenericError key="random-beer-error" error={randomBeerError}>
        <Loader key="random-beer-loader" loading={isRandomBeerLoading}>
          <Pod
            title={randomBeer?.name}
            img={randomBeer?.image_url}
            content={randomBeer?.description}
            actions={<></>}
          />
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
