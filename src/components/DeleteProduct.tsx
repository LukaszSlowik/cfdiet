"use client";

import { Product } from "@/lib/validators/newProduct";
import { useDeleteMutation } from "@/redux/features/products/productSlice";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  product: Product;
  queryparam: string;
};

export default function DeleteProduct({ product, queryparam }: Props) {
  const session = useSession();
  const userid = session.data?.user.id;
  let disableClass =
    userid !== product.userId ? "pointer-events-none opacity-40" : "";

  //delete via RTK query
  const [mutate, { isLoading, isError, isSuccess }] = useDeleteMutation();

  const [deletestate, setDeleteState] = useState<string | null>(null);

  return (
    <div className="group relative flex ">
      <Trash2
        className={`w-6 h-6 text-red-500 cursor-pointer   ${disableClass} `}
        onClick={() => mutate(product.id as string)}
      />

      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border-slate-50 ring-[1px] ring-green-700 text-zinc-50 p-2 rounded mt-1 absolute top-full whitespace-nowrap  bg-slate-700 ">
        Usuń ten produkt
      </span>
    </div>
  );
}
