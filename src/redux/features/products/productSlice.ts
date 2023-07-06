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
  }),
});
export const { useTestQuery } = enhancedProductApi;
