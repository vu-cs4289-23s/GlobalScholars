import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Schema } from "mongoose";

const initialState = {
  loading: true,
  programInfo: {
    program_name: "",
    geo_link: "",
    location: [],
    budget: null,
    budget_last_update: "",
    terms: [],
    restrictions: "",
    type: "",
    calendar: "",
    housing: "",
    min_gpa: 0,
    language_of_instruction: "",
    language_prerequisite: "",
    additional_prerequisite: "",
    image_link: "",
    program_link: "",
    star_rating: 0,
    top_tags: [],
  },
  locationInfo: {
    city: "",
    country: "",
    description: "",
    programs: [],
    like_cnt: 0,
    star_rating: 0,
    top_tags: [],
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