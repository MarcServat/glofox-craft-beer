import React, { ReactElement } from "react";

interface PodProps {
  title?: string;
  img?: string;
  content?: string;
  actions: ReactElement;
}

const Pod = (props: PodProps): ReactElement => {
  return (
    <div className="pod">
      <section>
        <h1>{props.title}</h1>
        <img src={props.img} alt={props.title} loading="lazy" height="300" />
      </section>
      <section>
        <p>{props.content}</p>
      </section>
      <section>{props.actions}</section>
    </div>
  );
};

export default Pod;
