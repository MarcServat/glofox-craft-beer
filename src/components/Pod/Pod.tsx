import React, { ReactElement, ReactNode } from "react";
import "./Pod.css";

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
