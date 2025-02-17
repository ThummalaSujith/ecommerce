import { apiSlice } from "./apiSlice";

import { CATEGORY_URL } from "../features/constants.js";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: updatedCategory,
        credentials: "include",
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    fetchCategory: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
      }),
    }),
  }),
});



export const {useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useFetchCategoryQuery}=categoryApiSlice;
