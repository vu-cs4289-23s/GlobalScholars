import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter-slice";
import userReducer from "../redux/user/user-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
