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
      state.response = action.payload;
    },
    setHeaders(state, action: PayloadAction<string>): void {
      state.headers = action.payload;
    },
  },
});

export const { setOperation, setHeaders, setResponse } = playgroundSlice.actions;

export default playgroundSlice.reducer;
