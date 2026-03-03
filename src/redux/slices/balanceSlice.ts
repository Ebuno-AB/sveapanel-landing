import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      const newBalance = (state + action.payload).toFixed(1);
      state = Number(newBalance);
      return state;
    },
    decrement: (state, action: PayloadAction<number>) => {
      const newBalance = (state - action.payload).toFixed(1);
      state = Number(newBalance);
      return state;
    },
  },
});

// Export actions
export const { increment, decrement } = balanceSlice.actions;

//Export reducer
export default balanceSlice.reducer;