import { isValidBeer } from "./utils";
import GETPunkAPI from "../../../mocks/GETPunkAPI.json";
import { PunkApi } from "../../../types/api";

const punkBeerAPI = GETPunkAPI[0] as unknown as PunkApi;

describe("Given a beer", () => {
  describe("When it have a name and a description", () => {
    it("is a valid beer", () => {
      const validBeer = isValidBeer(punkBeerAPI);

      expect(validBeer).toStrictEqual(GETPunkAPI[0]);
    });
  });

  describe("When it does not have the require properties", () => {
    test.each([
      {
        beer: () => {
          const { name, ...withOutName } = punkBeerAPI;
          return withOutName;
        },
      },
      {
        beer: () => {
          const { description, ...withOutDescription } = punkBeerAPI;
          return withOutDescription;
        },
      },
      {
        beer: () => {
          const { name, description, ...withOutNameAndDescription } =
            punkBeerAPI;
          return withOutNameAndDescription;
        },
      },
    ])("then it should call the callback arg", ({ beer }) => {
      const validBeer = isValidBeer(beer());

      expect(validBeer).toBe(undefined);
    });
  });
});
