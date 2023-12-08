"use client";
import ReactDOM from "react-dom/client";
import React, { useContext, useEffect, useState } from "react";
import { Loader, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCreonsettings } from "@/lib/fetch/fetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeAll,
  removeOne,
  edit,
  selectMealReverse,
} from "@/redux/features/mealSlice";
import { WeightUnits } from "@/lib/validators/newProduct";
import { useGetCreonSettingsQuery } from "@/redux/features/creonsettings/creonsettingsSlice";

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
  const mealState = useAppSelector(selectMealReverse);
  const dispatchRedux = useAppDispatch();
  const [isLoadingMealState, setIsLoadingMealState] = useState(false);

  // useEffect(() => {
  //   setIsLoadingMealState(true);
  //   const timer = setTimeout(() => {
  //     setIsLoadingMealState(false);
  //   }, 500); // adjust delay as needed
  //   return () => clearTimeout(timer);
  // }, [mealState]);

  // rest of your code

  console.log("mealState:", mealState);

  const session = useSession();
  const userSessionId = session.data?.user.id;
  // const {
  //   data: creonSettings,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["creonSettings", userSessionId],
  //   queryFn: getCreonsettings,
  //   staleTime: 60000,
  //   refetchOnMount: false,
  // });
  const {
    isLoading,
    error,
    data: creonSettings,
  } = useGetCreonSettingsQuery(userSessionId);

  if (!mealState) return <div> Nie wybrano produktów</div>;

  // if (error || isLoading)
  //   return (
  //     <div className="flex flex-col z-[999]  h-screen w-screen items-center justify-start  overflow-hidden ">
  //       <div className="text-center ">
  //         <Loader className="w-12 h-12  animate-spin-slow   text-blue-800" />
  //         <span className="sr-only">Ładuje...</span>
  //       </div>
  //     </div>
  //   );z

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
                  dispatchRedux(removeAll());
                }}
              >
                {<Trash2 className="w-6 h-6 text-red-500 cursor-pointer" />}
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
                      <Trash2 className="w-6 h-6 text-red-500 cursor-pointer" />
                    </span>
                  </td>
                  <td className="font-medium text-left">
                    {element.productName}
                  </td>

                  <td className="font-medium w-[60px]  sm:px-2">
                    <input
                      type="text"
                      className="border-[1px] h-8 rounded-md p-1 text-center  text-xs sm:text-sm w-[50px] sm:w-[70px]"
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
