import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  productName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(100, { message: "Username must be at max 100 characters." }),
  kcal: z.number().step(0.01).optional(),
  fat: z
    .number({ required_error: "Fat need to be added .If no than put 0" })
    .step(0.01, { message: "Fat must be at added. If no than put 0" }),
  weightPiece: z.number().step(0.01).optional(),
  weightHandful: z.number().step(0.01).optional(),
  weightGlass: z.number().step(0.01).optional(),
  weightSpoon: z.number().step(0.01).optional(),
  weightSmallspoon: z.number().step(0.01).optional(),
  userId: z.string().optional(),
});

export const WeightUnitsSchema = z.object({
  weightPiece: z.number().step(0.01),
  weightHandful: z.number().step(0.01),
  weightGlass: z.number().step(0.01),
  weightSpoon: z.number().step(0.01),
  weightSmallspoon: z.number().step(0.01),
  g: z.number().step(0.01),
});

export const MealProductSchema = ProductSchema.extend({
  amount: z.number().step(0.01),
  fatForMeal: z.number().step(0.01),
  unit: z
    .string()
    .min(2, {
      message: "unit must be at least 2 characters.",
    })
    .max(100, { message: "unit must be at max 100 characters." }),
}).extend({ weightUnits: WeightUnitsSchema });
export const WeightKeysSchema = z.enum([
  "weightPiece",
  "weightHandful",
  "weightGlass",
  "weightSpoon",
  "weightSmallspoon",
  "g",
]);
//array validator

export const MessageArraySchema = z.array(ProductSchema);
export const MealProductArraySchema = z.array(MealProductSchema);
export type MealProduct = z.infer<typeof MealProductSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type WeightUnits = z.infer<typeof WeightUnitsSchema>;
