"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/lib/validators/newProduct";

import { Product } from "@prisma/client";
import { getProductbyId, getProducts, updateProduct } from "@/lib/fetch/fetch";
type Props = {
  productId: string;
};

export default function UpdateProduct({ productId }: Props) {
  const router = useRouter();
  const search = useSearchParams();  // get parametr from url to predefine search field state
  const searchQueryDefault = search ? search.get("q") as string : ""; // if parametr exist then get q parametr
  const queryClient = useQueryClient();

  const { data: product, isLoading: isLoading2 } = useQuery({
    queryKey: ["productsList",productId],
    queryFn: async () => getProductbyId(productId),
  });
  let productToUdate: Partial<Product> = {
    id: "",
    productName: "",
    kcal: 0,
    fat: 0,
    userId: "",
    weightGlass: 0,
    weightHandful: 0,
    weightPiece: 0,
    weightSmallspoon: 0,
    weightSpoon: 0,
  };

  // productToUdate = (products as Product[])?.filter(
  //   (product: any) => product?.id === productId
  // )[0];
  //console.log("Product to update: ", productToUdate)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    values: product,
    resolver: zodResolver(ProductSchema),
  });

  const { mutate: UpdateProduct, isLoading } = useMutation({
    mutationFn: async (product: Product) => {
      await updateProduct(product,productId)
    },
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries({ queryKey: ["productsList"] });
      const previousProducts = queryClient.getQueriesData(["productsList"]);
//       queryClient.setQueriesData(["productsList"], (old: any) =>
// {
//       if(old){
//         old?.map((obj: any) => {
//           console.log(obj.id, " ", productId);
//           if (obj.id === productId) {
//             console.log("bedzie zminiony produkt:", product);
//             return product;
//           } else return obj;
//         })
//       }}
      
      // );
      // return { previousProducts };
    },
    // onError: (err, product, context) => {
    //   queryClient.setQueryData(["productsList"], context?.previousProducts);
    // },
    onSettled: async (data,err,product) => {
      console.log("onSuccess: productsList")

      queryClient.invalidateQueries({ queryKey: ["productsList"] });
      

      //router.push("/products/productsList");
      router.back()
    },
  });

  const submitData = (data: Partial<Product>) => {
    //console.log("Works", data);
    UpdateProduct(data as Product);
  };

  if (isLoading2 ) {
    return <div>Is Ładuje...</div>;
  }

  if (!product) {
    return <div>No product</div>;
  }

  return (
    <div className="flex justify-center flex-col">
      <div>
        <svg
          onClick={() => router.back()}
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
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </div>
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex gap-4 flex-col   w-md "
      >
        <div className="flex justify-center flex-col sm:flex-row gap-4 ">
          <div className="flex  flex-col  gap-2 ">
            <label>Product name: </label>
            <input
              type="text"
              {...register("productName")}
              className="text-black"
            />
            {errors.productName && (
              <span className="text-red-400">{errors.productName.message}</span>
            )}
            <label>Kcal: </label>
            <input
              type="number"
              step=".01"
              
              {...register("kcal", { valueAsNumber: true })}
              className="text-black"
            />
            {errors.kcal && (
              <span className="text-red-400">{errors.kcal.message}</span>
            )}
            <label>Fat: </label>
            <input
              type="number"
              step=".01"
              {...register("fat", { valueAsNumber: true })}
              className="text-black"
            />
            {errors.fat && (
              <span className="text-red-400">{errors.fat.message}</span>
            )}
            <label>Weight of one piece:</label>

            <input
              type="number"
              step=".01"
              {...register("weightPiece", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />
          </div>

          <div className="flex  flex-col  gap-2 ">
            <label>Weight of one small spoon: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSmallspoon", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one spoon: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightSpoon", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one glass: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightGlass", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one handful: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightHandful", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />

            <input type="submit" className="cursor-pointer" />
          </div>
        </div>
      </form>
    </div>
  );
}
