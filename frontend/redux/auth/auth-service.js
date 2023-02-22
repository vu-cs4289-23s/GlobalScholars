import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "/api/v1";
// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  username: "",
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: async (state, action) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${backendURL}/session`,
          action.payload,
          config
        );
        state.username = data.username;
        state.success = true;
        state.loading = false;
        state.error = null;
      } catch (error) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
