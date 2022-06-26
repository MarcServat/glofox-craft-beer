import React from "react";

interface LoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

const Loader = (props: LoaderProps) => {
  if (props.loading) {
    return <div>Loading...</div>;
  }

  return <>{props.children}</>;
};

export default Loader;
