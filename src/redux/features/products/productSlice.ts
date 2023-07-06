import { Product } from "@/lib/validators/newProduct";
import { apiSlice } from "../api/apiSlice";

const productApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Product"],
});
const enhancedProductApi = productApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/api/products/getProducts",

      providesTags: [{ type: "Product", id: "LIST" }],
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
    add: builder.mutation({
      query: (product) => ({
        url: `/api/products/newProduct`,
        method: "POST",
        body: product,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});
export const { useTestQuery, useSearchProductsQuery, useAddMutation } =
  enhancedProductApi;
