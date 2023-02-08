import { createSlice } from "@reduxjs/toolkit";

// TODO #4: Set the initial state of the counter
const initialState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      // TODO #5: increment the counter
      state.counter += 1;
    },
    decrement: (state) => {
      // TODO #6: decrement the counter (if it is less than 1, return before decremented)
      if (state.counter < 1) return;
      state.counter -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
