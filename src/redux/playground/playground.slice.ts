import { getErrors } from './playground.helper';
import { UserPlaygroundData } from '@/redux';
import { initialState } from '@/redux/playground/playground.const';
import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

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
    setVars(state, action: PayloadAction<string>): void {
      state.vars = action.payload;
    },
    setHeaders(state, action: PayloadAction<string>): void {
      state.headers = action.payload;
    },
    setIsFetch(state, action: PayloadAction<boolean>): void {
      state.isFetch = action.payload;
    },
    setError(state, action: PayloadAction<FetchBaseQueryError | SerializedError | null>): void {
      const { payload } = action;
      if (!payload) {
        state.error = [];
      } else {
        state.response = JSON.stringify(payload, null, 2);
        state.error = getErrors(payload);
      }
      payload;
    },
    setSlice(state, action: PayloadAction<UserPlaygroundData>): void {
      const { operation, vars, headers } = action.payload;
      state.operation = operation;
      state.vars = vars;
      state.headers = headers;
      state.init = false;
    },
    resetSlice(state) {
      const { operation, vars, headers } = initialState;
      state.init = true;
      state.operation = operation;
      state.vars = vars;
      state.headers = headers;
      state.previousData = null;
    },
    setPreviousData(state, action: PayloadAction<UserPlaygroundData | null>) {
      if (action.payload === null) {
        state.previousData = null;
        return;
      }
      const { operation, vars, headers } = action.payload;
      state.previousData = {
        operation,
        vars,
        headers,
      };
    },
  },
});

export const {
  setOperation,
  setVars,
  setResponse,
  setHeaders,
  setError,
  setIsFetch,
  setSlice,
  resetSlice,
  setPreviousData,
} = playgroundSlice.actions;

export default playgroundSlice.reducer;
