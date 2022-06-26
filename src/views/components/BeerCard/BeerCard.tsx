import React, { ReactElement, useState } from "react";
import GenericError from "../../../components/GenericError/GenericError";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../../../constants";
import { PunkApi } from "../../../types/api";
import useFetch from "../../../hooks/useFetch";
import Pod from "../../../components/Pod/Pod";

interface BeerCardProps {}

const BeerCard = (props: BeerCardProps): ReactElement => {
  const [randomBeer, setRandomBeer] = useState<PunkApi>();
  const [error, setError] = useState("");

  const meetRequirements = (beer: PunkApi) => {
    if (beer.name && beer.description) {
      return beer;
    }
    refetch();
  };

  const { loading, refetch } = useFetch<PunkApi[]>({
    url: BASE_URL_API + GET_BEERS + RANDOM,
    onSuccess: (response) => {
      if (response.length > 1) {
        const selectedBeer =
          response[Math.floor(Math.random() * response.length)];
        const beer = meetRequirements(selectedBeer);
        setRandomBeer(beer);
      }
      if (response.length === 1) {
        const beer = meetRequirements(response[0]);
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
