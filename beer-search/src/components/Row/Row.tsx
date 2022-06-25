import React from "react";

interface RowProps {
  img: { src: string; alt: string };
  title: string;
  content: string;
}

const Row = (props: RowProps) => {
  return (
    <div>
      <img src={props.img.src} alt={props.img.alt} />
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export default Row;
