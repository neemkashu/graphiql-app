/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { rickAndMortyApi } from '@/redux/rickAndMorty/rickAndMorty.api';
import { configureStore } from '@reduxjs/toolkit';
import playgroundSlice from './playground/playground.slice';

export const store = configureStore({
  reducer: {
    playgroundSlice,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});
