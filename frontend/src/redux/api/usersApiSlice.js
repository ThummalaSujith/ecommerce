import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
        },
        credentials: "include",
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
         
          },
      }),
      invalidatesTags: ["User"], 
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url:`${USERS_URL}/${id}`
      }),
      keepUnusedDataFor:5
    }),

    updateUser:builder.mutation({
        query:(data)=>({

            url:`${USERS_URL}/${data.id}`,
            method:"PUT",
            body:data,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }),

            invalidatesTags:["User"]

    })


  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,

} = userApiSlice;
