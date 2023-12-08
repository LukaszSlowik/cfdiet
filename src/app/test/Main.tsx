"use client";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./componentsForTests/FallBackComponent";
import Person from "./componentsForTests/Person";
type Props = {};

const Main = ({}: Props): JSX.Element => {
  const errorHandler = (error: Error, info: { componentStack: string }) => {
    console.log("errorHandler", error, info);
  };

  return (
    <>
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={errorHandler}
      >
        <Person person={{}} />
      </ErrorBoundary>
    </>
  );
};
export default Main;
