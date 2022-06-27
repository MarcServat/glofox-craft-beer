import React, { ReactElement, useState } from "react";
import GenericError from "../../../components/GenericError/GenericError";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../../../constants";
import { PunkApi } from "../../../types/api";
import useFetch from "../../../hooks/useFetch";
import Pod from "../../../components/Pod/Pod";
import { isValidBeer, ValidatedBeer } from "./utils";

const BeerCard = (): ReactElement => {
  const [randomBeer, setRandomBeer] = useState<ValidatedBeer>();
  const [error, setError] = useState("");

  const { loading, refetch } = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    onSuccess: (response) => {
      if (response.length > 1) {
        const selectedBeer =
          response[Math.floor(Math.random() * response.length)];
        const beer = isValidBeer(selectedBeer, refetch);
        setRandomBeer(beer);
      }
      if (response.length === 1) {
        const beer = isValidBeer(response[0], refetch);
        setRandomBeer(beer);
      }
    },
    onError: () => {
      setError("No random beer");
    },
  });
  return (
    <GenericError key="random-beer-error" error={error}>
      <Loader key="random-beer-loader" loading={loading}>
        {randomBeer && (
          <Pod
            title={randomBeer.name}
            img={randomBeer.image_url}
            content={randomBeer.description}
            actions={
              <section className="actions">
                <Button content="Another Beer" onClick={() => refetch()} />
                <Button
                  content="Random non alcoholic beer"
                  onClick={() => {
                    refetch({ abv_lt: "1" }, BASE_URL_API + GET_BEERS);
                  }}
                />
              </section>
            }
          />
        )}
      </Loader>
    </GenericError>
  );
};

export default BeerCard;
