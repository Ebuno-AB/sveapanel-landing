// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './slices/balanceSlice';
import sessionReducer from './slices/sessionSlice';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;