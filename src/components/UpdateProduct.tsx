import { Product } from "@/lib/validators/newProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { Edit3 } from "lucide-react";
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
      <Edit
        onClick={() =>
          router.push(
            `/products/${product.id}/updateProduct?q=${encodedSearchQuery}`
          )
        }
        className={`w-6 h-6 text-green-700 cursor-pointer ${disableClass}`}
      />

      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border-slate-50 ring-[1px] ring-green-700 text-zinc-50 p-2 rounded mt-1 absolute top-full whitespace-nowrap  bg-slate-700 ">
        Edytuj ten produkt
      </span>
    </div>
  );
}
