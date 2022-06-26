import React, { ReactElement, ReactNode, useState } from "react";
import "./Pod.css";
import GenericError from "../GenericError/GenericError";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { BASE_URL_API, GET_BEERS, RANDOM } from "../../constants";
import { PunkApi } from "../../types/api";
import useFetch from "../../hooks/useFetch";

interface PodProps {
  title: string;
  img: string;
  content: string;
  actions: ReactNode;
}

const Pod = (props: PodProps): ReactElement => {
  return (
    <section className="pod">
      <h1 className="pod__header">{props.title}</h1>
      <img
        className="pod__image"
        src={props.img}
        alt={props.title}
        loading="lazy"
        height="300"
      />
      <p className="pod__content">{props.content}</p>
      <aside className="pod__actions">{props.actions}</aside>
    </section>
  );
};

export default Pod;
