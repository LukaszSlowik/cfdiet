"use client";
import useDebounce from "@/hooks/useDebounce";
//import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";

import { MealDispatch } from "@/context/mealContext";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { add, selectMeal } from "@/redux/features/mealSlice";
import { MealProduct } from "@/lib/validators/newProduct";
import { useSearchProductsQuery } from "@/redux/features/products/productSlice";
import { motion } from "framer-motion";
import {
  Loader2,
  Pizza,
  Apple,
  Citrus,
  IceCream,
  Cookie,
  Cherry,
  Grape,
  IceCream2,
  Utensils,
  Soup,
  Banana,
} from "lucide-react";
import { RandomSpinnerFoodWrapper, spinners } from "../../data/spinners";
type Props = {};

// const spinners = [
//   <Pizza key={"pizza"} className="w-12 h-12 text-orange-400   " />,
//   <Apple key={"Apple"} className="w-12 h-12 text-green-400  " />,
//   <Grape key={"Grape"} className="w-12 h-12 text-green-400  " />,
//   <Utensils key={"Utensils"} className="w-12 h-12 text-green-400  " />,
//   <Citrus key={"Citrus"} className="w-12 h-12 text-yellow-400  " />,
//   <Banana key={"Banana"} className="w-12 h-12 text-yellow-400  " />,
//   <IceCream key={"IceCream"} className="w-12 h-12 text-blue-400  " />,
//   <IceCream2 key={"IceCream2"} className="w-12 h-12 text-blue-400  " />,
//   <Soup key={"Soup"} className="w-12 h-12 text-blue-400  " />,
//   <Cherry key={"Cherry"} className="w-12 h-12 text-blue-400  " />,
//   <Cookie key={"Cookie"} className="w-12 h-12 text-amber-600  " />,
// ];

export default function SearchProduct({}: Props) {
  const nameInput = useRef<HTMLInputElement>(null);
  const [currentSpinner, setCurrentSpinner] = useState(spinners[0]);
  const dispatchRedux = useAppDispatch();
  const meal = useAppSelector(selectMeal);
  const [searchQuery, setSearchQuery] = useState("");
  const debauncedSearchTerm = useDebounce(searchQuery, 600);
  const { data } = useSearchProductsQuery(debauncedSearchTerm);
  console.log("searchQuery: ", searchQuery);
  console.log("debauncedSearchTerm: ", debauncedSearchTerm);
  const [isLoading, setIsLoading] = useState(false);
  const clear = () => {
    if (nameInput.current) {
      //nameInput.current.value = "";
      nameInput.current.focus();
      setSearchQuery("");
    }
  };
  const handleAddButton = async (product: any) => {
    setCurrentSpinner(spinners[Math.floor(Math.random() * spinners.length)]);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/popularity/${product.id}`, {
        method: "PUT",
      });
      console.log("Popularity fetch was done");
      const returnedJson = response.json();
    } catch (err) {
      console.log(err);
    }
    const newProduct: MealProduct = {
      ...product,
      amount: 0,
      id: meal.length,
      fatForMeal: 0,
      unit: "g",
      weightUnits: {
        weightPiece: product.weightPiece || 0,
        weightHandful: product.weightHandful || 0,
        weightGlass: product.weightGlass || 0,
        weightSpoon: product.weightSpoon || 0,
        weightSmallspoon: product.weightSmallspoon || 0,
        g: 1,
      },
    };

    dispatchRedux(add(newProduct));
    clear();
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center  items-center w-full sm:2/3 ">
        <form
          className="flex justify-center content-center  "
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            value={searchQuery}
            ref={nameInput}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="px-5 py-2 w-5/6 sm:px-5 sm:py-3 my-1 min-w-[200px] focus-within:ring-1  ring-0  rounded-md  outline-none focus:outline-none   placeholder:text-zinc-400"
            placeholder="szukaj"
          />
        </form>
        <div className=" overflow-y-hidden">
          {data && data?.length === 0 && searchQuery.length > 0 && (
            <div className="mt-6"> Nic nie znaleziono</div>
          )}
          {isLoading && (
            <div className="flex flex-col h-screen w-screen justify-start items-center overflow-hidden ">
              <RandomSpinnerFoodWrapper>
                {currentSpinner}
              </RandomSpinnerFoodWrapper>
              {/* <motion.div
                initial={{ x: "-75%" }}
                animate={{
                  x: ["-75%", "75%"],
                  rotate: [0, 360],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                className="text-center p-4"
              >
                {/* <Pizza className="w-12 h-12 text-blue-600 animate-spin" /> */}
            </div>
          )}

          {data &&
            data?.length > 0 &&
            searchQuery.length > 0 &&
            data?.map((product: any) => (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  {
                    handleAddButton(product);
                  }
                }}
                key={product.id}
                className="flex  gap-2 my-1   justify-between   cursor-pointer  hover:outline-none   "
              >
                <div className="text-lg font-normal p-2 rounded-md shadow-md min-w-[200px] border text-center  hover:font-semibold">
                  {product.productName}
                </div>
                <div className="text-xl font-bold"></div>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
}
