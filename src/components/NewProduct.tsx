"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, ProductSchema } from "@/lib/validators/newProduct";
import ObjectID from "bson-objectid";
export default function NewProduct() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });

  const router = useRouter();

  const { mutate: AddProduct, isLoading } = useMutation({
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
    // onMutate: async (product: Product) => {
    //   await queryClient.cancelQueries({ queryKey: ["productsList", product.productName] });

    //   console.log("id created xxxxxxxxxxxxxxxxxxxxxxxxxxxxx: ", product.id);

    //   const previousProducts = queryClient.getQueriesData(["productsList",product.productName]);
    //   queryClient.setQueriesData(["productsList",product.productName], (old: any) => [
    //     ...old,
    //     product,
    //   ]);
    //   return { previousProducts };
    // },
    // onError: (err, product, context) => {
    //   queryClient.setQueryData(["productsList", product.productName], context?.previousProducts);
    // },
    onSettled:  async (data,err,product) => {
      queryClient.invalidateQueries({ queryKey: ["productsList"] });
      const encodedSearchQuery = encodeURI(product.productName);
      router.push(`/products/productsList?q=${encodedSearchQuery}&global=true`)
    },
   // onSuccess: () => router.push(`/products/productsList`),
  });

  const submitData = (data: Product) => {
    // data.id = ObjectID().toHexString();
    // console.log("data id: ", data.id);
    AddProduct(data);
  };

  return (
    <div className="flex justify-center flex-col ">
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
              className="text-black bg-slate-200"
            />
            {errors.productName && (
              <span className="text-red-400">{errors.productName.message}</span>
            )}
             <label>Fat: </label>
            <input
              type="number"
              step="0.01"
              
              {...register("fat", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />

            <label>Kcal: </label>
            <input
              type="number"
              step="0.01"
              
              {...register("kcal", { valueAsNumber: true })}
              className="text-black bg-slate-200"
            />
            {/* {errors.kcal && (
              <span className="text-red-400">{errors.kcal.message}</span>
            )} */}
           
          
            <label>Weight of one piece:</label>

            <input
              type="number"
              
              step=".01"
              {...register("weightPiece", { valueAsNumber: true})}
              className="text-black bg-slate-200"
            />
          </div>

          <div className="flex  flex-col  gap-2 ">
            <label>Weight of one small spoon: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSmallspoon", { valueAsNumber: true})}
              className="text-black bg-slate-200"
            />
            <label>Weight of one spoon: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSpoon", { valueAsNumber: true})}
              className="text-black bg-slate-200"
            />
            <label>Weight of one glass: </label>
            <input
              type="number"
              step=".01"
              {...register("weightGlass", { valueAsNumber: true})}
              className="text-black bg-slate-200"
            />
            <label>Weight of one handful: </label>
            <input
              type="number"
              step=".01"
              {...register("weightHandful", { valueAsNumber: true})}
              className="text-black bg-slate-200"
            />
          </div>
        </div>
        <input type="submit" className="cursor-pointer" />
      </form>
    </div>
  );
}
