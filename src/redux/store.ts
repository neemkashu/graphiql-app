/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { LS_KEYS } from '@/common';
import { rickAndMortyApi } from '@/redux/rickAndMorty/rickAndMorty.api';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/auth.slice';
import playgroundSlice from './playground/playground.slice';

const persistConfig = {
  key: LS_KEYS.REDUX,
  storage,
  blacklist: ['authSlice', rickAndMortyApi.reducerPath],
};

const rootReducer = combineReducers({
  authSlice,
  playgroundSlice,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rickAndMortyApi.middleware),
});

export const persistor = persistStore(store);
