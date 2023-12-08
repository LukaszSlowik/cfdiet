"use client";
import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

type Props = {
  person: any;
};
const Person = ({ person }: Props): JSX.Element => {
  const { showBoundary } = useErrorBoundary();
  const [count, setCount] = useState(0);
  const handleClick = () => {
    try {
      if (count === 3) {
        throw new Error("Error");
      } else {
        setCount((count) => count + 1);
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <>
      {/* <h1>Hello {person.firstName.toUpperCase()}</h1> */}
      <button onClick={handleClick}>Click</button>
      <div>{count}</div>
    </>
  );
};
export default Person;
