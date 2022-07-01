import rest from "./request";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import { isValidBeer, ValidatedBeer } from "../views/components/BeerCard/utils";
import { PunkApi } from "../types/api";

export const getBeers = (params?: Record<string, string>) => {
  return rest
    .get(BASE_URL_API + GET_BEERS, params)
    .then((response: PunkApi[]) => {
      const beerList = response.map((beer) => {
        return isValidBeer(beer);
      });
      return new Promise<ValidatedBeer[]>((resolve, reject) => {
        resolve(beerList as ValidatedBeer[]);
      });
    });
};

export const getRandomBeer = (params?: Record<string, string>) => {
  return rest
    .get(BASE_URL_API + GET_BEERS + RANDOM, params)
    .then((response) => {
      const beer = isValidBeer(response[0]);
      return new Promise<ValidatedBeer | undefined>((resolve, reject) => {
        resolve(beer);
      });
    });
};
