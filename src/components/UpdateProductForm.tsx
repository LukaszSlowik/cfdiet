"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, ProductSchema } from "@/lib/validators/newProduct";

import {
  useEditMutation,
  useGetQuery,
} from "@/redux/features/products/productSlice";
import { Undo2 } from "lucide-react";

type Props = {
  productId: string;
};

export default function UpdateProduct({ productId }: Props) {
  const router = useRouter();
  const search = useSearchParams(); // get parametr from url to predefine search field state
  const searchQueryDefault = search ? (search.get("q") as string) : ""; // if parametr exist then get q parametr

  const { data: product, isLoading: isLoading2 } = useGetQuery(productId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    values: product,
    resolver: zodResolver(ProductSchema),
  });

  const [UpdateProduct, { isLoading, isSuccess }] = useEditMutation();
  if (isSuccess) {
    router.back();
  }

  const submitData = (data: Partial<Product>) => {
    //console.log("Works", data);
    UpdateProduct(data as Product);
  };

  if (isLoading2) {
    return <div>Ładuje...</div>;
  }

  if (!product) {
    return <div>Nie znaleziono produktu</div>;
  }

  return (
    <div className="flex justify-center flex-col">
      <div>
        <Undo2 onClick={() => router.back()} className="cursor-pointer mb-2" />
      </div>
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex gap-4 flex-col w-md "
      >
        <div className="flex justify-center flex-col sm:flex-row gap-4 ">
          <div className="flex  flex-col  gap-2 ">
            <label>Nazwa produkt: </label>
            <input type="text" {...register("productName")} className="" />
            {errors.productName && (
              <span className="text-red-400">{errors.productName.message}</span>
            )}
            <label>Kcal: </label>
            <input
              type="number"
              step=".01"
              {...register("kcal", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=""
            />
            {errors.kcal && (
              <span className="text-red-400">{errors.kcal.message}</span>
            )}
            <label>Tłuszcz: </label>
            <input
              type="number"
              step=".01"
              {...register("fat", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              className=""
            />
            {errors.fat && (
              <span className="text-red-400">{errors.fat.message}</span>
            )}
            <label>Waga sztuki:</label>

            <input
              type="number"
              step=".01"
              {...register("weightPiece", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=" "
            />
          </div>

          <div className="flex  flex-col  gap-2 ">
            <label>Waga łyżeczki: </label>
            <input
              type="number"
              step=".01"
              {...register("weightSmallspoon", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=" "
            />
            <label>Waga łyżki: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightSpoon", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=" "
            />
            <label>Waga szklanki: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightGlass", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=" "
            />
            <label>Waga garści: </label>
            <input
              type="number"
              step="0.01"
              {...register("weightHandful", {
                setValueAs: (v) =>
                  v === "" || Number.isNaN(v) || v === null
                    ? undefined
                    : parseFloat(v),
              })}
              className=" "
            />

            <button
              type="submit"
              className="cursor-pointer bg-slate-600 text-slate-50 mt-4 p-2 rounded-md hover:bg-slate-700"
            >
              Zapisz
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
