"use client";
import { Product } from "@/lib/validators/newProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  product: Product;
};

export default function DuplicateProduct({ product }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const userid = session?.user.id;
  let disableClass =
    userid !== product.userId ? "pointer-events-none opacity-40" : "";
  const { data, isLoading, isError, mutate } = useMutation({
    mutationFn: async (product: Product) => {
      const response = await fetch("/api/products/newProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      return response.body;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
      const encodedSearchQuery = encodeURI(product.productName);
      router.push(
        `/products/productsList?q=${encodedSearchQuery}&global=false`
      );
    },
  });

  const [deletestate, setDeleteState] = useState<string | null>(null);

  return (
    <div className="group relative flex hover:pb-2">
      <svg
        onClick={() => mutate(product)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
      </svg>
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border-slate-50 ring-[1px] ring-green-700 text-zinc-50 p-2 rounded mt-1 absolute top-full whitespace-nowrap  bg-slate-700 ">
        {" "}
        Duplicate as yours{" "}
      </span>
    </div>
  );
}
