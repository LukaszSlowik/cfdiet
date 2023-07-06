import React from "react";
import CreonsSettings from "./components/CreonsSettings";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col gap-8 mt-10">
      <Link
        className="no-underline hover:opacity-60 transition duration-300 ease-in-out border-b-2"
        href="/products/productsList"
      >
        Lista z produktami
      </Link>
      <Link
        className="no-underline hover:opacity-60 transition duration-300 ease-in-out border-b-2"
        href="/settings/creonsettings"
      >
        Ustawienia dawek kreonu
      </Link>
    </div>
  );
}
