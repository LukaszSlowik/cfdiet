"use client";
import { useTestQuery } from "@/redux/features/products/productSlice";
import { useState, useEffect } from "react";
type Props = {};

export const TestRTK = ({}: Props): JSX.Element => {
  const { isError, isLoading, data } = useTestQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
