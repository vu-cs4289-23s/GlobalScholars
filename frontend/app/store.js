import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
