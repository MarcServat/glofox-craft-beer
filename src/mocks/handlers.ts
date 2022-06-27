import { rest } from "msw";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import GETPunkAPI from "../mocks/GETPunkAPI.json";
import { PunkApi } from "../types/api";

export const handlers = [
  rest.get(BASE_URL_API + GET_BEERS, (req, res, context) => {
    let response = GETPunkAPI as unknown as PunkApi[];
    const params = new URLSearchParams(req.url.search);
    const abv_lt = params.get("abv_lt");
    if (abv_lt) {
      const beers = response.filter((beer) => {
        if (beer.abv) return beer.abv < parseFloat(abv_lt);
      });
      return res(context.delay(2000), context.status(200), context.json(beers));
    }
    return res(
      context.delay(2000),
      context.status(200),
      context.json(response)
    );
  }),
  rest.get(BASE_URL_API + GET_BEERS + RANDOM, (req, res, context) => {
    return res(
      context.delay(2000),
      context.status(200),
      context.json([GETPunkAPI[0]])
    );
  }),
];
