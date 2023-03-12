import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { backendApi, useSignupMutation, useLoginMutation, useLogoutMutation, useProfileQuery } from "./apis/backendApi"

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
})

setupListeners(store.dispatch)

export { useSignupMutation, useLoginMutation, useLogoutMutation, useProfileQuery }
