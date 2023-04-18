import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = '/api/v1';

const initialState = {
  postInfo: {
    _id: '',
    owner: '',
    timestamp: Date.now(),
    content: '',
    tags: [],
    likes: 0,
    dislikes: 0,
    saves: 0,
    location: '',
    program: '',
  },
  loading: true,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: 'post',
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
      state.success = false;
    },
    reset: (state, action) => {
      state.loading = initialState.loading;
      state.postInfo = initialState.postInfo;
      state.success = initialState.success;
      state.error = initialState.error;
    },
  },
});

// DEFINE ACTIONS HERE
export const getAllPostsAsyncAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(
      `${backendURL}/posts/user/${user}`,
      config
    );
    //  console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getPostByIdAsyncAction = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(`${backendURL}/post/${id}`, config);
    //  console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getPostsByLocationAsyncAction = (location) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(
      `${backendURL}/posts/location/${location}`,
      config
    );
    //   console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const getPostsByProgramAsyncAction = (program) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(
      `${backendURL}/posts/program/${program}`,
      config
    );
    //   console.log(response.data);
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const submitNewForumPostByCity = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${backendURL}/post/city`, data, config);
    //  console.log(response.data);
    dispatch(submitPost(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const submitNewForumPostByProgram = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      `${backendURL}/post/program`,
      data,
      config
    );
    //  console.log(response.data);
    dispatch(submitPost(response.data));
  } catch (error) {
    console.log(error);
    dispatch(error(error));
  }
};

export const resetPost = () => (dispatch) => {
  dispatch(reset());
};

export const { getPosts, submitPost, reset, error } = postSlice.actions;

export default postSlice.reducer;
