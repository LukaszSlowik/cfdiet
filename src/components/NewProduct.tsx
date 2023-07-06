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
            <label>Nazwa produktu: </label>
            <input type="text" {...register("productName")} className="" />
            {errors.productName && (
              <span className="text-red-400">{errors.productName.message}</span>
            )}
            <label>Tłuszcz: </label>
            <input
              type="number"
              step="0.01"
              {...register("fat", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
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
              className=""
            />
            {/* {errors.kcal && (
              <span className="text-red-400">{errors.kcal.message}</span>
            )} */}

            <label>Waga sztuki:</label>

            <input
              type="number"
              step=".01"
              {...register("weightPiece", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
            {errors.weightPiece && (
              <span className="text-red-400">{errors.weightPiece.message}</span>
            )}
          </div>

          <div className="flex  flex-col  gap-2 ">
            <label>Waga łyżeczki: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSmallspoon", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
            <label>Waga łyżki: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSpoon", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
            <label>Waga szklanki: </label>
            <input
              type="number"
              step=".01"
              {...register("weightGlass", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
            <label>Waga garści: </label>
            <input
              type="number"
              step=".01"
              {...register("weightHandful", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-slate-600 text-slate-50 mt-4 p-2 rounded-md hover:bg-slate-700"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
}
