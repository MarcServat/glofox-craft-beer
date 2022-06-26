import React, { useState } from "react";
import SearchBar, { FormValues } from "../components/SearchBar/SearchBar";
import Row from "../components/Row/Row";
import GenericError from "../components/GenericError/GenericError";
import Loader from "../components/Loader/Loader";
import useGetBeers from "../hooks/useGetBeers";
import "./BeerPage.css";
import BeerCard from "./components/BeerCard/BeerCard";
import FilterBeer from "./components/FilterBeer/FilterBeer";

const BeerPage = () => {
  return (
    <>
      <BeerCard />
      <FilterBeer />
    </>
  );
};

export default BeerPage;
