import React, { ReactElement } from "react";

interface PodProps {
  title: string;
  img: { src: string; alt: string };
  content: string;
  actions: ReactElement;
}

const Pod = (props: PodProps) => {
  return (
    <div>
      <section>
        <h1>{props.title}</h1>
        <img src={props.img.src} alt={props.img.alt} />
      </section>
      <section>
        <p>{props.content}</p>
      </section>
      <section>{props.actions}</section>
    </div>
  );
};

export default Pod;
