import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = '/api/v1';
/**
 *   title: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },

  saves: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
  location: { type: Schema.ObjectId, ref: 'Location' },
  cheapest_month: { type: [String], default: [] },

  cost_by_month: { type: [String], default: [] },
 */

const initialState = {
  tripInfo: {
    _id: '',
    rating: 0,
    cost: 0,
    saves: [],
    location: '',
    cheapest_month: [],
    cost_by_month: [],
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
      state.tripInfo = action.payload;
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
export const getAllTrips = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      `${backendURL}/trip`,
      {
        to: {
          city: 'San Francisco',
          country: 'United States',
          latitude: 37.7749295,
          longitude: -122.4194155,
        },
      },
      config
    );
    //  console.log(response.data);
    dispatch(getTrips(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getTrips, reset, error } = tripSlice.actions;

export default tripSlice.reducer;
