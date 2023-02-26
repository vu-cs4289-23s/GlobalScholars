import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userIcon from "../../assets/userProfile-icon.svg";

const initialState = {
  loading: true,
  loggedIn: false,
  userInfo: {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "",
    first_name: "",
    last_name: "",
    avatar_url: userIcon,
  },
  userToken: null,
  error: null,
  success: false,
};
const backendURL = "/api/v1";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
      state.success = true;
      state.error = null;
    },

    login: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("username", action.payload.username);
      state.loggedIn = true;
      state.error = null;
    },

    register: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.loading = false;
      state.userInfo = {
        username: "",
        first_name: "",
        last_name: "",
        avatar_url: userIcon,
      };
      state.userToken = null;
      state.loggedIn = false;
      state.error = null;
      state.success = true;
      localStorage.removeItem("username");
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// DEFINE ACTIONS HERE
export const loginAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${backendURL}/session`, data, config);
    dispatch(login(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getUserAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/user/${data}`, config);
    dispatch(getData(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const loginWithGoogleAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/session/google`,
      data,
      config
    );
    dispatch(login(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const registerAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${backendURL}/user`, data, config);
    dispatch(register(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const logoutAction = () => (dispatch) => {
  const config = {};
  console.log("logoutAsync");
  axios
    .delete(`${backendURL}/session`, config)
    .then(() => {
      console.log("logout success");
      dispatch(logout());
    })
    .catch((err) => {
      console.log(err);
      dispatch(error(err));
    });
};

export const { getData, login, logout, register, error } = userSlice.actions;

export default userSlice.reducer;
