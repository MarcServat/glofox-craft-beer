import React from "react";
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
