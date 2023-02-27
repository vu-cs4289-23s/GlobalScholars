import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter-slice";
import userReducer from "../redux/user/user-slice";
import postReducer from "../redux/post/post-slice.js";
import geoReducer from "../redux/geo/geo-slice.js"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    post: postReducer,
    geo: geoReducer,
  },
});

