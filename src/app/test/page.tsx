import { TestRTK } from "@/components/TestRTK";
import TestSearchRTK from "@/components/TestSearchRTK";
import { useState, useEffect } from "react";
import Person from "./componentsForTests/Person";
//import ErrorBoundary from "./componentsForTests/ErrorBoundary";

import Main from "./Main";
type Props = {};

const ComponentName = ({}: Props): JSX.Element => {
  const errorHandler = (error: Error, info: { componentStack: string }) => {
    console.log("errorHandler", error, info);
  };

  return (
    <>
      <div>
        {/* <TestRTK /> */}
        <Main />
      </div>
    </>
  );
};
export default ComponentName;
