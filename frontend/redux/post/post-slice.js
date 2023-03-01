import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "/api/v1";

const initialState = {
  postInfo: {
    _id: "",
    owner: "",
    timestamp: Date.now(),
    content: "",
    tags: [],
    likes: 0,
    dislikes: 0,
    saves: 0,
    location: "",
    program: "",
  },
  loading: true,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.loading = false;
      state.postInfo = action.payload;
      state.success = true;
      state.error = null;
    },
    submitPost: (state, action) => {
      state.loading = false;
      state.postInfo = action.payload;
      state.success = true;
      state.error = null;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    reset: (state, action) => {
      state.loading = initialState.loading;
      state.postInfo = initialState.postInfo;
      state.success = initialState.success;
      state.error = initialState.error;
    }
  }
});

// DEFINE ACTIONS HERE
export const getAllPostsAsyncAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/posts`, config);
  //  console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getPostsByUserAsyncAction = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${backendURL}/posts/user/${user}`, config);
  //  console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const submitNewForumPost = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${backendURL}/post`, data, config);
  //  console.log(response.data);
    dispatch(submitPost(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
}

export const resetPost = () => (dispatch) => {
  dispatch(reset());
}

export const { getPosts, submitPost, reset, error } = postSlice.actions;

export default postSlice.reducer;