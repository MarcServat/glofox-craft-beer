import React, { ReactElement, useEffect, useState } from "react";
import GenericError from "../../../components/GenericError/GenericError";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../../../constants";
import Pod from "../../../components/Pod/Pod";
import { isValidBeer, ValidatedBeer } from "./utils";
import rest from "../../../utils/request";
import { getBeers, getRandomBeer } from "../../../utils/punkAPI";

const BeerCard = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [randomBeer, setRandomBeer] = useState<ValidatedBeer>();
  const [error, setError] = useState("");

  useEffect(() => {
    getRandomBeer().then((beer) => {
      setLoading(false);
      console.log(beer);
      setRandomBeer(beer);
    });
  }, []);

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
                <Button
                  content="Another Beer"
                  onClick={() => {
                    setLoading(true);
                    getRandomBeer().then((beer) => {
                      setLoading(false);
                      setRandomBeer(beer);
                    });
                  }}
                />
                <Button
                  content="Random non alcoholic beer"
                  onClick={() => {
                    setLoading(true);
                    getBeers({ abv_lt: "1" })
                      .then((response) => {
                        setLoading(false);
                        if (response.length > 1) {
                          const selectedBeer =
                            response[
                              Math.floor(Math.random() * response.length)
                            ];
                          setRandomBeer(selectedBeer);
                        }
                      })
                      .catch(() => {
                        setError("No random beer");
                      });
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
