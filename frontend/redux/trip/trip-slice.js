import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = '/api/v1';

const initialState = {
  tripInfo: {
    trips: [],
  },
  loading: true,
  error: null,
  success: false,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    getTrips: (state, action) => {
      state.loading = false;
      state.tripInfo.trips = action.payload;
      state.success = true;
      state.error = null;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    reset: (state, action) => {
      state.loading = initialState.loading;
      state.tripInfo = initialState.tripInfo;
      state.success = initialState.success;
      state.error = initialState.error;
    },
  },
});

// DEFINE ACTIONS HERE
export const getAllTrips = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${backendURL}/trip`, data, config);
    console.log(response.data);
    dispatch(getTrips(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getTrips, reset, error } = tripSlice.actions;

export default tripSlice.reducer;
