import { rest } from "msw";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../constants";
import GETPunkAPI from "../mocks/GETPunkAPI.json";

export const handlers = [
  rest.get(BASE_URL_API + GET_BEERS, (req, res, context) => {
    return res(context.status(200), context.json(GETPunkAPI));
  }),
  rest.get(BASE_URL_API + GET_BEERS + RANDOM, (req, res, context) => {
    return res(context.status(400), context.json(GETPunkAPI[0]));
  }),
];
