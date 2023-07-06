"use client";
import { MealContext, MealDispatch } from "@/context/mealContext";
import ReactDOM from "react-dom/client";
import React, { useContext, useEffect, useState } from "react";
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import {
  Table as TableUI,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RowActions from "@/components/rowsActionsForTable";
import { Meal } from "@prisma/client";
import { getCreonsettings } from "@/lib/fetch/fetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeAll,
  removeOne,
  edit,
  selectMeal,
} from "@/redux/features/mealSlice";
import { MealProduct, WeightUnits } from "@/lib/validators/newProduct";

type Props = {};

const unitsForSelect = {
  weightPiece: "sztuka",
  g: "gram",
  weightHandful: "garść",
  weightGlass: "szklanka",
  weightSpoon: "łyżka",
  weightSmallspoon: "łyżeczka",
};

export default function MealTable({}: Props) {
  const mealState = useAppSelector(selectMeal);
  const dispatchRedux = useAppDispatch();

  console.log("mealState:", mealState);

  const session = useSession();
  const userSessionId = session.data?.user.id;
  const {
    data: creonSettings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["creonSettings", userSessionId],
    queryFn: getCreonsettings,
    staleTime: 60000,
    refetchOnMount: false,
  });

  if (!mealState) return <div> Nie wybrano produktów</div>;

  if (isLoading || error)
    return (
      <div className="flex flex-col justify-start sm:justify-center overflow-y-hidden ">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Ładuje...</span>
          </div>
        </div>
      </div>
    );
  return (
    // <div className="overflow-x-auto w-screen">
    <div className="flex flex-col justify-start sm:justify-center ">
      <table className="">
        <thead className="border-b">
          <tr className="py-4">
            <td className="font-light py-8">
              <span
                className="font-medium w-[10px]  sm:px-2"
                onClick={() => {
                  // //react-query
                  // dispatch({
                  //   type: "DELETE_ALL",
                  // });
                  //redux
                  dispatchRedux(removeAll());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </td>
            <td className="font-light px-1 sm:px-2  text-start ">Produkt</td>

            <td className="font-light px-1 sm:px-2 text-center">Ilość</td>
            <td className="font-light px-1 sm:px-2 text-center">Jednostka</td>
            <td className="font-light w-20 px-1 sm:px-2 text-center">
              Kreonów
            </td>
            <td className="font-light w-20 px-1  sm:px-2 text-center">
              Tłuszcz
            </td>
          </tr>
        </thead>
        <tbody>
          {mealState &&
            mealState?.map((element) => {
              return (
                <tr key={element.id} className="border-b py-8">
                  <td className="font-medium w-[10px] pr-1 py-4  sm:px-2 ">
                    <span
                      className="font-medium w-[10px]  sm:px-2"
                      onClick={() => {
                        // //react-query
                        // dispatch({
                        //   type: "DELETE",
                        //   payload: { id: element.id },
                        // });
                        //redux
                        dispatchRedux(removeOne(element.id));
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </td>
                  <td className="font-medium text-left">
                    {element.productName}
                  </td>

                  <td className="font-medium w-[60px]  sm:px-2">
                    <input
                      type="text"
                      className="bg-black border-[1px] h-8 rounded-md p-1 text-center  text-xs sm:text-sm w-[50px] sm:w-[70px]"
                      value={element.amount || ""}
                      onChange={(event) => {
                        //redux
                        console.log("edited id", element.id as string);
                        console.log("edited amount", event.target.value);
                        const fatForAmountAndUnit =
                          (Number(event.target.value) *
                            element.fat *
                            element.weightUnits[
                              element.unit as keyof WeightUnits
                            ]) /
                          100;
                        console.log("amount to update: ", event.target.value);
                        console.log(
                          "Fat for amount and unit: ",
                          fatForAmountAndUnit
                        );
                        const productToUpdate = {
                          ...element,

                          id: element.id,
                          amount: Number(event.target.value),
                          fatForMeal: fatForAmountAndUnit,
                        };

                        dispatchRedux(edit(productToUpdate));
                      }}
                    />
                  </td>
                  <td className="font-medium px-1 ">
                    <Select
                      onValueChange={(value: string) => {
                        console.log("unit changed");

                        // //redux
                        console.log("edited id", element.id as string);
                        console.log("edited unit", value);
                        const fatForAmountAndUnit =
                          (element.amount *
                            element.fat *
                            element.weightUnits[value as keyof WeightUnits]) /
                          100;

                        const productToUpdate = {
                          ...element,
                          id: element.id,
                          unit: value,
                          fatForMeal: fatForAmountAndUnit,
                        };

                        dispatchRedux(edit(productToUpdate));
                      }}
                    >
                      <SelectTrigger className=" ">
                        <SelectValue
                          placeholder={
                            unitsForSelect[
                              element.unit as keyof typeof unitsForSelect
                            ]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">{unitsForSelect["g"]}</SelectItem>
                        {element.weightUnits.weightPiece > 0 && (
                          <SelectItem value="weightPiece">
                            {unitsForSelect["weightPiece"]}
                          </SelectItem>
                        )}
                        {element.weightUnits.weightHandful > 0 && (
                          <SelectItem value="weightHandful">
                            {unitsForSelect["weightHandful"]}
                          </SelectItem>
                        )}
                        {element.weightUnits.weightGlass > 0 && (
                          <SelectItem value="weightGlass">
                            {unitsForSelect["weightGlass"]}
                          </SelectItem>
                        )}
                        {element.weightUnits.weightSpoon > 0 && (
                          <SelectItem value="weightSpoon">
                            {unitsForSelect["weightSpoon"]}
                          </SelectItem>
                        )}
                        {element.weightUnits.weightSmallspoon > 0 && (
                          <SelectItem value="weightSmallspoon">
                            {unitsForSelect["weightSmallspoon"]}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="font-medium w-20 text-center">
                    {creonSettings
                      ? (
                          (Number(element.fatForMeal) *
                            creonSettings.unitsPerFatGram) /
                          creonSettings.unitsPerTablet
                        ).toFixed(1)
                      : null}
                  </td>
                  <td className="font-medium w-20 text-center">
                    {Number(element.fatForMeal).toFixed(2)}
                  </td>
                </tr>
              );
            })}

          {Array.isArray(mealState) && mealState.length > 0 && (
            <tr className="pb-8">
              <td className="font-light pb-16"></td>
              <td className="font-bold text-lg">Suma</td>

              <td className="font-light"></td>

              <td className="font-light"></td>
              <td className="font-bold text-lg text-center">
                {mealState
                  ?.map(
                    (i) =>
                      (i.fatForMeal * creonSettings.unitsPerFatGram) /
                      creonSettings.unitsPerTablet
                  )
                  .reduce((a: any, b: any) => a + b, 0)
                  .toFixed(1)}
              </td>
              <td className="font-light text-lg text-center">
                {mealState
                  ?.map((i) => i.fatForMeal)
                  .reduce((a: any, b: any) => a + b, 0)
                  .toFixed(2)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
