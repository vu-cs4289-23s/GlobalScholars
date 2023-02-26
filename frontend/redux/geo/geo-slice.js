import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  program: false,
  location: false,
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
        state.location = false;
        state.program = true;
        state.locationInfo = initialState.locationInfo;
        state.programInfo = action.payload;
        state.success = true;
        state.error = null;
      },
      getLocations: (state, action) => {
        state.loading = false;
        state.location = true;
        state.program = false;
        state.locationInfo = action.payload;
        state.programInfo = initialState.programInfo;
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
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // try {
  //   // try for program fetch by name
  //   const program = await axios.get(`${backendURL}/geo/program/${name}`, config);
  //   //  console.log(program.data);
  //   dispatch(getPrograms(program.data));
  // } catch (error) {
  //   try {
  //     const location = await axios.get(`${backendURL}/geo/location/${name}`, config);
  //     console.log(location.data);
  //     dispatch(getLocations(location.data));
  //   } catch (error) {
  //     // neither a location or program exist with specified name
  //     console.log(error);
  //     dispatch(error(error));
  //   }
  // }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/geo/forum/${name}`, config);
    console.log(response.data);
   // dispatch(getPrograms(response.data));
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
    //  console.log(response.data);
    dispatch(getLocations(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const { getPrograms, getLocations, error } = geoSlice.actions;

export default geoSlice.reducer;