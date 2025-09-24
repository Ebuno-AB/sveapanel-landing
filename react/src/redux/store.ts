// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './slices/balanceSlice';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;