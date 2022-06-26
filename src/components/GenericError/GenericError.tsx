import React from "react";

interface GenericErrorProps {
  children: React.ReactElement;
  error?: string;
}
const GenericError = (props: GenericErrorProps) => {
  if (!props.error) return props.children;

  return (
    <div>
      <i className="fa-solid fa-hexagon-exclamation"></i>
      <section>{props.error}</section>
    </div>
  );
};

export default GenericError;
