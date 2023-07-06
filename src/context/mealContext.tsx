"use client";
import { Product } from "@prisma/client";
import { useReducer } from "react";
import { createContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export type LocalMeal = {
  id: number;
  productName: string;
  amount: number;
  unit: "g" | "piece";
  fat: number;
  fatFor100: number;
  weightUnits: number;
};

export const MealContext = createContext<any>(null);
export const MealDispatch = createContext<any>(null);

export const MealProvider = ({ children }: Props) => {
  const mealReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOADING": {
        return { ...state };
      }
      case "ADD": {
        console.log("ADD Action");

        console.log("action.payload:", action.payload);
        const newState = [
          ...state,
          {
            id: state.length,
            productName: action.payload.productName,
            amount: 0,
            unit: "g",
            fat: 0,
            fatFor100: action.payload.fat,
            weightUnits: {
              weightPiece: action.payload.weightPiece || 0,
              weightHandful: action.payload.weightHandful || 0,
              weightGlass: action.payload.weightGlass || 0,
              weightSpoon: action.payload.weightSpoon || 0,
              weightSmallspoon: action.payload.weightSmallspoon || 0,
              g: 1,
            },
          },
        ];
        console.log("new state:", newState);

        return newState.sort((a: Product, b: Product) =>
          a.id > b.id ? -1 : 1
        );
      }
      case "DELETE": {
        console.log("DELETE Action");

        const newState = state.filter(
          (item: any) => item.id !== action.payload.id
        );

        console.log("new state:", newState);

        return newState;
      }
      case "DELETE_ALL": {
        console.log("DELETE All Action");

        const newState: any = [];

        console.log("new state:", newState);

        return newState;
      }

      case "EDIT": {
        const propertyName: string = action.payload.key;
        const propertyValue = action.payload.newvalue;
        const propertyid = action.payload.id;
        // let newState = state.map((element:any)=> {

        // } )
        console.log("propertyName:", propertyName);
        console.log("propertyValue:", propertyValue);
        console.log("propertyId:", propertyid);

        let tempArray = state.map((item: any) => {
          if (item.id === propertyid) {
            return {
              ...item,
              [propertyName]: propertyValue,
            };
          } else {
            return item;
          }
        });
        let tempArray2 = tempArray.map((item: any) => {
          if (item.id === propertyid) {
            return {
              ...item,
              fat:
                (item.amount * item.fatFor100 * item.weightUnits[item.unit]) /
                100,
            };
          } else {
            return item;
          }
        });
        return tempArray2;
      }

      default:
        return state;
    }
  };

  const [mealState, dispatchData] = useReducer(mealReducer, []);
  return (
    <MealContext.Provider value={mealState}>
      <MealDispatch.Provider value={dispatchData}>
        {children}
      </MealDispatch.Provider>
    </MealContext.Provider>
  );
};
