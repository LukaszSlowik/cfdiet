import { Product } from "@/lib/validators/newProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  product: Product;
  queryparam: string;
};

export default function UpdateProduct({ product, queryparam }: Props) {
  //const queryClient = useQueryClient()
  console.log("queryparam:", queryparam);
  const router = useRouter();
  const session = useSession();
  const userid = session.data?.user.id;
  let disableClass =
    userid !== product.userId ? "pointer-events-none opacity-40" : "";
  const encodedSearchQuery = encodeURI(queryparam);
  return (
    <div className="group relative flex ">
      <svg
        onClick={() =>
          router.push(
            `/products/${product.id}/updateProduct?q=${encodedSearchQuery}`
          )
        }
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 text-green-700 cursor-pointer ${disableClass}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border-slate-50 ring-[1px] ring-green-700 text-zinc-50 p-2 rounded mt-1 absolute top-full whitespace-nowrap  bg-slate-700 ">
        Edytuj ten produkt
      </span>
    </div>
  );
}
