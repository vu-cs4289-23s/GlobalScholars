import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "/api/v1";

const initialState = {
  locationInfo: {
    city: "",
    country: "",
    description: "",
    programs: [],
    like_cnt: 0,
  },
  loading: true,
  error: null,
  success: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocations: (state, action) => {
      state.loading = false;
      state.locationInfo = action.payload;
      state.success = true;
      state.error = null;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
});

// DEFINE ACTIONS HERE
export const getAllLocationsAsyncAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/locations`, config);
  //  console.log(response.data);
    dispatch(getLocations(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getLocationByCityAsyncAction = (city) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/location/${city}`, config);
  //  console.log(response.data);
    dispatch(getLocations(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getLocations, error } = locationSlice.actions;

export default locationSlice.reducer;