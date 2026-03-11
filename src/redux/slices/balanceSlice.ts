import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return Number((state + action.payload).toFixed(1));
    },
    decrement: (state, action: PayloadAction<number>) => {
      return Number((state - action.payload).toFixed(1));
    },
  },
});

// Export actions
export const { increment, decrement } = balanceSlice.actions;

//Export reducer
export default balanceSlice.reducer;
