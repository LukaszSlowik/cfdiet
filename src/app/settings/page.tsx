import React from "react";
import CreonsSettings from "./components/CreonsSettings";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <CreonsSettings />
      <Link
        className="no-underline hover:opacity-60 transition duration-300 ease-in-out"
        href="/products/productsList"
      >
        Products
      </Link>
    </div>
  );
}
