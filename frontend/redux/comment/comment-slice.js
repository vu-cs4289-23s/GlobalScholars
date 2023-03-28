import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentInfo: {
  },
  loading: true,
  error: null,
  success: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComments: (state, action) => {

    },
    submitComment: (state, action) => {

    },
    error: (state, action) => {

    },
    reset: (state, action) => {

    }
  }
});

export default commentSlice.reducer;