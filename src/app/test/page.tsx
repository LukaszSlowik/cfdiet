import { TestRTK } from "@/components/TestRTK";
import TestSearchRTK from "@/components/TestSearchRTK";
import { useState, useEffect } from "react";
type Props = {};

const ComponentName = ({}: Props): JSX.Element => {
  return (
    <>
      <div>
        {/* <TestRTK /> */}
        <TestSearchRTK />
      </div>
    </>
  );
};
export default ComponentName;
