import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userIcon from "../../assets/userProfile-icon.svg";

const backendURL = "/api/v1";

const initialState = {
  loading: true,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  }
});

// DEFINE ACTIONS HERE
