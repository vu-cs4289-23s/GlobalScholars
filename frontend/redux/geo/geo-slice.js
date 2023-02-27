import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  programInfo: {
    location: [],
    program_name: "",
    description: "",
    majors: [],
    semesters: [],
    courses: [],
    estimated_budget: [],
    prerequisites: [],
    language: [],
    like_cnt: 0,
  },
  locationInfo: {
    city: "",
    country: "",
    description: "",
    programs: [],
    like_cnt: 0,
  },
  error: null,
  success: false,
};

const backendURL = "/api/v1";

const geoSlice = createSlice({
    name: "geo",
    initialState,
    reducers: {
      getPrograms: (state, action) => {
        state.loading = false;
        state.programInfo = action.payload;
        state.success = true;
        state.error = null;
      },
      getLocations: (state, action) => {
        state.loading = false;
        state.locationInfo = action.payload;
        state.success = true;
        state.error = null;
      },
      getForumData: (state, action) => {
        state.loading = false;
        state.locationInfo = action.payload.location;
        state.programInfo = action.payload.program;
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
export const getForumDataByName = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/forum/${name}`, config);
  //  console.log(response.data);
    dispatch(getForumData(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getAllProgramsAsyncAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/programs`, config);
    //  console.log(response.data);
    dispatch(getPrograms(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getProgramByNameAsyncAction = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/program/${name}`, config);
    //  console.log(response.data);
    dispatch(getPrograms(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

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

export const getLocationByNameAsyncAction = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/location/${name}`, config);
     console.log(response.data);
    dispatch(getLocations(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getPrograms, getLocations, getForumData, error } = geoSlice.actions;

export default geoSlice.reducer;