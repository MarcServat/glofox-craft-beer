import React, { ReactElement } from "react";

interface LoaderProps {
  loading: boolean;
  children: ReactElement | ReactElement[];
}

const Loader = (props: LoaderProps) => {
  if (props.loading) {
    return <div>Loading...</div>;
  }

  return <>{props.children}</>;
};

export default Loader;
