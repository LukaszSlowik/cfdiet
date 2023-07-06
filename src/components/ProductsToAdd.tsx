import { MealContext, MealDispatch } from "@/context/mealContext";
import { Post, Product, User } from "@prisma/client";
import Image from "next/image";
import { useContext } from "react";

interface ProductsProps {
  products: Array<Product & { user: User }> | null;
}

export default function ProductsToAdd({ products }: ProductsProps) {

  const dispatch = useContext(MealDispatch);

  if (!products) {
    return <div> No products</div>;
  }

  return (
    <>
      {products.map((product) => (
        <div
        onClick={()=> dispatch({type:"ADD", payload:product})}
          key={product.id}
          className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600  justify-between  w-5/6 sm:w-2/4 cursor-pointer hover:bg-black hover:outline-none hover:ring-[1px] hover:ring-green-700"
        >
          <div className="text-lg font-light">{product.productName}</div>
          <div className="text-xl font-semibold">
            {" "}
            <Image
              src={product.user.image || ""}
              alt="avatar"
              height={32}
              width={32}
              className="rounded-full"
            />
          </div>
        </div>
      ))}
    </>
  );
}
