"use client";

import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  product: Product;
  queryparam:string
};

export default function DeleteProduct({ product ,queryparam}: Props) {
  const queryClient = useQueryClient();

const session = useSession()
const userid = session.data?.user.id
let disableClass = userid !== product.userId ? "pointer-events-none opacity-40" : ""
  const { data, isLoading, isError, mutate } = useMutation({
    mutationFn: async (product: Product) => {
      const result = await fetch(
        `/api/products/product/${product.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result.json();
    },
    // onMutate: async (product: Product) => {
    //   await queryClient.cancelQueries({ queryKey: ["productsList"] });
    //   const previousProducts = queryClient.getQueriesData(["productsList"]);

    //   queryClient.setQueriesData(["productsList"], (old: any) =>
    //     old.filter((d: any) => d.id !== product.id)
    //   );
    //   return { previousProducts };
    // },
    // onError: (err, product, context) => {
    //   queryClient.setQueryData(["productsList"], context?.previousProducts);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["productsList"] });
    // },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
    },
  });

  const [deletestate, setDeleteState] = useState<string | null>(null);

  return (
    <div   className="group relative flex " >
      <svg
      onClick={() => mutate(product)}

        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-6 h-6 text-red-500 cursor-pointer   ${disableClass} `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border-slate-50 ring-[1px] ring-green-700 text-zinc-50 p-2 rounded mt-1 absolute top-full whitespace-nowrap  bg-slate-700 "> Delete this product </span>
    </div>
  );
}