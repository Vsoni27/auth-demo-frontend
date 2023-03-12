import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const backendApi = createApi({
  reducerPath: "backend",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      login: builder.mutation({
        invalidatesTags: ["profile"],
        query: ({ email, password }) => ({
          url: "/api/users/login",
          method: "POST",
          body: { email, password },
        }),
      }),

      signup: builder.mutation({
        query: ({ email, password, name }) => ({
          url: "/api/users",
          method: "POST",
          body: { email, password, name },
        }),
      }),

      profile: builder.query({
        providesTags: ["profile"],
        query: () => ({
          url: "/api/users/me",
          method: "GET",
        }),
      }),

      logout: builder.mutation({
        invalidatesTags: ["profile"],
        query: () => ({
          url: "/api/users/logout",
          method: "POST",
        }),
      }),
    }
  },
})

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useProfileQuery } = backendApi
