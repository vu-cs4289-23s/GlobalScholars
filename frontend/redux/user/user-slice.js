import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userIcon from "../../assets/userProfile-icon.svg";
import { googleLogout } from "@react-oauth/google";

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
    majors: [],
    minors: [],
    grad_year: "",
    bio: "",
    background_url: "",
    posts: [],
    saved_posts: [],
    // saved_comments: [],
    // saved_events: [],
    tags: [],
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
    getUser: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
      state.success = true;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.loading = false;
      console.log("updateUser", state.userInfo);
      for (const [key, value] of Object.entries(action.payload)) {
        state.userInfo[key] = value;
      }
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

    loginWithGoogle: (state, action) => {
      state.loading = false;
      // state.userInfo = action.payload;
      localStorage.setItem("userToken", action.payload);
      state.userToken = action.payload;
      state.loggedIn = true;
      state.error = null;
    },
    updateUserFromGoogle: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
      state.error = null;
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

// Get user by username
export const getUserAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/user/${data}`, config);
    dispatch(getUser(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getUserByIdAsyncAction = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/user/id/${id}`, config);
    dispatch(getUser(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const updateUserAsyncAction = (data) => async (dispatch) => {
  console.log("updateUserAsyncAction", data);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(
      `${backendURL}/user`,
      {
        ...data,
        username: localStorage.getItem("username"),
      },
      config
    );
    dispatch(updateUser(data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const googleLogin = (response) => async (dispatch) => {
  console.log(response);
  const data = {
    username: response.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, ""),
    first_name: response.name.split(" ")[0],
    last_name: response.name.split(" ")[1],
    avatar_url: response.picture,
    primary_email: response.email,
    password: response.sub,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    //if user exists, do a login
    //if user does not exist, create user and then login
    const checkUser = await axios.head(`${backendURL}/user/${data.username}`);
    const loginUser = await axios.post(`${backendURL}/session`, data, config);
    dispatch(login(loginUser.data));
  } catch (error) {
    const createUser = await axios.post(
      `${backendURL}/user/google`,
      data,
      config
    );
    dispatch(register(createUser.data));
    const loginUser = await axios.post(`${backendURL}/session`, data, config);
    dispatch(login(loginUser.data));
  }
};

export const registerAndLoginAsyncAction = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("registerAndLoginAsyncAction", data);
    let response = await axios.post(`${backendURL}/user`, data, config);
    dispatch(register(response.data));
    response = await axios.post(`${backendURL}/session`, data, config);
    dispatch(login(response.data));
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
  googleLogout();
};

export const {
  getUser,
  updateUser,
  login,
  logout,
  register,
  error,
  loginWithGoogle,
  updateUserFromGoogle,
} = userSlice.actions;

export default userSlice.reducer;
