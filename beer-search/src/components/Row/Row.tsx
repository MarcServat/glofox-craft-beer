import React from "react";
import "./Row.css";

interface RowProps {
  img: string;
  name: string;
  content: string;
}

const Row = (props: RowProps) => {
  console.log("render");

  return (
    <div className="row">
      <img
        className="row__image"
        src={props.img}
        alt={props.name}
        loading="lazy"
        height="200"
      />
      <section>
        <h1 className="row__header">{props.name}</h1>
        <p>{props.content}</p>
      </section>
    </div>
  );
};

export default Row;
