import React, { ReactElement, useEffect, useState } from "react";
import SearchBar, { FormValues } from "../../../components/SearchBar/SearchBar";
import GenericError from "../../../components/GenericError/GenericError";
import Loader from "../../../components/Loader/Loader";
import Row from "../../../components/Row/Row";
import useGetBeers from "../../../hooks/useGetBeers";
import { BASE_URL_API, GET_BEERS } from "../../../constants";
import rest from "../../../utils/request";
import { PunkApi } from "../../../types/api";
import { getBeers } from "../../../utils/punkAPI";

const FilterBeer = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [beerList, setBeerList] = useState<PunkApi[]>([]);

  useEffect(() => {
    setLoading(true);

    getBeers()
      .then((response) => {
        setLoading(false);
        setBeerList(response);
      })
      .catch(() => setError("Coudn't get full list of beers"));
  }, []);

  const onSubmit = (params: FormValues) => {
    setLoading(true);
    getBeers(params)
      .then((response) => {
        setLoading(false);
        setBeerList(response);
      })
      .catch(() => setError("Coudn't get full list of beers"));
  };
  return (
    <>
      <h1>Search</h1>
      <SearchBar onSubmit={onSubmit} />
      <GenericError key="beer-list-error" error={error}>
        <Loader key="beer-list-loader" loading={loading}>
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

export default FilterBeer;
