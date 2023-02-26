import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter-slice";
import userReducer from "../redux/user/user-slice";
import postReducer from "../redux/post/post-slice.js";
import programReducer from "../redux/program/program-slice.js";
import locationReducer from "../redux/location/location-slice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    post: postReducer,
    program: programReducer,
    location: locationReducer,
  },
});

