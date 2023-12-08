import MealTable from "@/components/MealTable";
import SearchProduct from "@/components/SearchProduct";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {};

export default async function page({}: Props) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col  sm:items-center ">
      {!session && (
        <div className="  text-center">
          <p>Zeby używać aplikacji</p>
          <p>kliknij Zaloguj</p>
        </div>
      )}

      <SearchProduct />
      <br />
      <MealTable />
    </div>
  );
}
