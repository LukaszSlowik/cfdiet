"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, get } from "react-hook-form";
import { Product, ProductSchema } from "@/lib/validators/newProduct";
import ObjectID from "bson-objectid";
import { useAddMutation } from "@/redux/features/products/productSlice";
export default function NewProduct() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });

  const router = useRouter();

  //rtk query add product
  const [mutate, { isLoading, isSuccess }] = useAddMutation();

  if (isSuccess) {
    const encodedSearchQuery = encodeURI(getValues("productName"));
    router.push(`/products/productsList?q=${encodedSearchQuery}&global=true`);
  }

  const submitData = (data: Product) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center flex-col ">
      <div>
        <Undo2 className="cursor-pointer" onClick={() => router.back()} />
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
              {...register("fat", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            {errors.fat && (
              <span className="text-red-400">{errors.fat.message}</span>
            )}

            <label>Kcal: </label>
            <input
              type="number"
              step="0.01"
              {...register("kcal", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            {/* {errors.kcal && (
              <span className="text-red-400">{errors.kcal.message}</span>
            )} */}

            <label>Weight of one piece:</label>

            <input
              type="number"
              step=".01"
              {...register("weightPiece", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            {errors.weightPiece && (
              <span className="text-red-400">{errors.weightPiece.message}</span>
            )}
          </div>

          <div className="flex  flex-col  gap-2 ">
            <label>Weight of one small spoon: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSmallspoon", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one spoon: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSpoon", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one glass: </label>
            <input
              type="number"
              step=".01"
              {...register("weightGlass", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
            <label>Weight of one handful: </label>
            <input
              type="number"
              step=".01"
              {...register("weightHandful", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className="text-black bg-slate-200"
            />
          </div>
        </div>
        <input type="submit" className="cursor-pointer" />
      </form>
    </div>
  );
}
