"use client";
import { useState, useEffect } from "react";
import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
} from "react-error-boundary";

type Props = {};

const FallbackComponent = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <>
      <div>Something is wrong</div>
      <div>{error.message}</div>
      <button
        className="bg-slate-400 m-2 p-2 rounded-md focus:bg-slate-600"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </>
  );
};
export default FallbackComponent;
