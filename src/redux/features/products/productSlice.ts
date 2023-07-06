import { Product } from "@/lib/validators/newProduct";
import { apiSlice } from "../api/apiSlice";

const productApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Product"],
});
const enhancedProductApi = productApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/api/products/getProducts",

      providesTags: ["Product"],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (searchTerm) => `/api/searchProducts?q=${searchTerm}`,
      providesTags: (result, error, searchProducts) => [
        { type: "Product", searchProducts },
      ],
      //   transformResponse: (response: Product[]) => {
      //     //reverse order of products
      //     return response.reverse();
      //     },
    }),
  }),
});
export const { useTestQuery, useSearchProductsQuery } = enhancedProductApi;
