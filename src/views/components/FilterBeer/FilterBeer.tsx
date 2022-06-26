import React, { ReactElement } from "react";
import SearchBar, { FormValues } from "../../../components/SearchBar/SearchBar";
import GenericError from "../../../components/GenericError/GenericError";
import Loader from "../../../components/Loader/Loader";
import Row from "../../../components/Row/Row";
import useGetBeers from "../../../hooks/useGetBeers";

const FilterBeer = (): ReactElement => {
  const {
    loading: isBeerListLoading,
    error: beerListError,
    beerList,
    refetch: refetchBeer,
  } = useGetBeers();

  const onSubmit = (params: FormValues) => {
    refetchBeer(params);
  };
  return (
    <>
      <h1>Search</h1>
      <SearchBar onSubmit={onSubmit} />
      <GenericError key="beer-list-error" error={beerListError}>
        <Loader key="beer-list-loader" loading={isBeerListLoading}>
          <h1>Search Results</h1>
          {beerList.map((beer) => (
            <Row
              data-testid="row"
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

export default FilterBeer;
