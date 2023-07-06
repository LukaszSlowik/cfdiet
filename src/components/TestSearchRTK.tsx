"use client";
import useDebounce from "@/hooks/useDebounce";
import { useSearchProductsQuery } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect, useRef } from "react";
import NewProduct from "./NewProduct";
import { add, selectMeal } from "@/redux/features/mealSlice";
import { MealProduct } from "@/lib/validators/newProduct";
type Props = {};

const TestSearchRTK = ({}: Props): JSX.Element => {
  const nameInput = useRef<HTMLInputElement>(null);
  const dispatchRedux = useAppDispatch();
  const meal = useAppSelector(selectMeal);
  const [searchQuery, setSearchQuery] = useState("");
  const debauncedSearchTerm = useDebounce(searchQuery, 600);
  const { data } = useSearchProductsQuery(debauncedSearchTerm);
  console.log("searchQuery: ", searchQuery);
  console.log("debauncedSearchTerm: ", debauncedSearchTerm);

  const clear = () => {
    if (nameInput.current) {
      //nameInput.current.value = "";
      nameInput.current.focus();
      setSearchQuery("");
    }
  };
  const handleAddButton = async (product: any) => {
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
  };

  return (
    <>
      <div className="flex flex-col justify-center   items-center w-full sm:2/3 ">
        <form
          className="flex justify-center content-center"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            value={searchQuery}
            ref={nameInput}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="px-5 py-1 w-5/6 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 rounded-full focus:bg-black focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="szukaj"
          />
        </form>

        {data && data?.length === 0 && searchQuery.length > 0 && (
          <div className="mt-6"> Nic nie znaleziono</div>
        )}
        {data &&
          data?.length > 0 &&
          searchQuery.length > 0 &&
          data?.map((product: any) => (
            <div
              onClick={() => {
                handleAddButton(product);
              }}
              key={product.id}
              className="flex p-3 gap-4 my-1   justify-between   cursor-pointer hover:bg-black hover:outline-none hover:ring-[1px] hover:rounded-lg "
            >
              <div className="text-lg font-light border-b  text-center pb-1">
                {product.productName}
              </div>
              <div className="text-xl font-semibold"></div>
            </div>
          ))}
      </div>
    </>
  );
};
export default TestSearchRTK;
