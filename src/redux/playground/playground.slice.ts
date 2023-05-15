/* eslint-disable no-console */
import { initialState } from '@/redux/playground/playground.const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setOperation(state, action: PayloadAction<string>): void {
      state.operation = action.payload;
    },
    setResponse(state, action: PayloadAction<string>): void {
      console.log('set resp', action.payload);
      state.response = action.payload;
    },
    setVars(state, action: PayloadAction<string>): void {
      console.log('AAAA');
      state.vars = action.payload;
    },
  },
});

export const { setOperation, setVars, setResponse } = playgroundSlice.actions;

export default playgroundSlice.reducer;
