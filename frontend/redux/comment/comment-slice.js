import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { submitPost } from "../post/post-slice.js";

const backendURL = "/api/v1";

const initialState = {
    commentInfo: {
        _id: "",
        owner: "",
        timestamp: Date.now(),
        parent: "",
        likes: 0,
        dislikes: 0,
        saves: 0,
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
            state.loading = false;
            state.commentInfo = action.payload;
            state.success = true;
            state.error = null;
        },
        submitComment: (state, action) => {
            state.loading = false;
            state.commentInfo = action.payload;
            state.success = true;
            state.error = null;
        },
        error: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        reset: (state, action) => {
            state.loading = initialState.loading;
            state.commentInfo = initialState.commentInfo;
            state.success = initialState.success;
            state.error = initialState.error;
        }
    }
});

export const submitNewComment = (data) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(`${backendURL}/comment`, data, config);
        //  console.log(response.data);
        dispatch(submitComment(response.data));
    } catch (error) {
        console.log(error);
        dispatch(error(error));
    }
}

export const resetComment = () => (dispatch) => {
    dispatch(reset());
}

export const { getComments, submitComment, reset, error } = commentSlice.actions;

export default commentSlice.reducer;