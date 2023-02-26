import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  programInfo: {

  },
  error: null,
  success: false,
};

const backendURL = "/api/v1";

const programSlice = createSlice({
    name: "program",
    initialState,
    reducers: {
      getPrograms: (state, action) => {
        state.loading = false;
        state.programInfo = action.payload;
        state.success = true;
        state.error = null;
      },
      error: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    },
  }
);

// DEFINE ACTIONS HERE
export const getAllProgramsAsyncAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/programs`, config);
    console.log(response.data);
    dispatch(getPrograms(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getPrograms, error } = programSlice.actions;

export default programSlice.reducer;