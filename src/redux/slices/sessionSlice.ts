import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SessionState = {
  referral_code: string | null;
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    referral_code: null,
  } as SessionState,
  reducers: {
    setReferralCode: (state, action: PayloadAction<string | null>) => {
      state.referral_code = action.payload;
    },
  },
});


// Export actions
export const { setReferralCode } = sessionSlice.actions;

//Export reducer
export default sessionSlice.reducer;