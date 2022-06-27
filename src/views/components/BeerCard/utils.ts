import { PunkApi } from "../../../types/api";

export type ValidatedBeer = PunkApi &
  Required<Pick<PunkApi, "name" | "description">>;

export const isValidBeer = (
  beer: PunkApi,
  cb: () => void
): ValidatedBeer | undefined => {
  if (beer.name !== undefined && beer.description !== undefined) {
    return beer as ValidatedBeer;
  }
  cb();
};
