import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "./api/supabase-api";

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});
