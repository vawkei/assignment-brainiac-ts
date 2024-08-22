import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authIndex";
import { listSlice, authFormSlice } from "./index";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listSlice.reducer,
    authForm: authFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
