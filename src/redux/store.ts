import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import playgroundSlice from './playground/playground.slice';

export const store = configureStore({
  reducer: {
    authSlice,
    playgroundSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
