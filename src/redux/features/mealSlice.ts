import { MealProduct, Product } from "@/lib/validators/newProduct";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: MealProduct[] = [];

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    removeOne: (state, action) => {
      return state.filter(
        (product) => product.id !== (action.payload as string)
      );
    },
    removeAll: (state) => {
      state.splice(0, state.length);
    },
    edit: (state, action) => {
      const productToUpdate = action.payload;
      console.log("productToUpdate", productToUpdate);
      const product = state.find(
        (product) => product.id === productToUpdate.id
      );
      if (product) {
        product.fatForMeal = productToUpdate.fatForMeal;
        product.unit = productToUpdate.unit;
        product.amount = productToUpdate.amount;
        state.splice(state.indexOf(product), 1, product);
      }
    },
  },
});
//selectors
export const selectMeal = (state: RootState) => state.meal;
//selector with reverse order of products
export const selectMealReverse = (state: RootState) =>
  state.meal.slice().reverse();

export const { add, removeOne, removeAll, edit } = mealSlice.actions;
export default mealSlice.reducer;
