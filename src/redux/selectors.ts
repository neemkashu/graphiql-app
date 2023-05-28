import { RootState, UserPlaygroundData } from '@/redux';

export const operationSelector = (state: RootState): string => state.playgroundSlice.operation;

export const responseSelector = (state: RootState): string => state.playgroundSlice.response;

export const varsSelector = (state: RootState): string => state.playgroundSlice.vars;

export const headersSelector = (state: RootState): string => state.playgroundSlice.headers;

export const errorSelector = (state: RootState): string[] => state.playgroundSlice.error;

export const isFetchSelector = (state: RootState): boolean => state.playgroundSlice.isFetch;

export const playgroundDataSelector = (state: RootState): UserPlaygroundData => {
  return {
    operation: state.playgroundSlice.operation,
    headers: state.playgroundSlice.headers,
    vars: state.playgroundSlice.vars,
  };
};

export const previousDataSelector = (state: RootState): UserPlaygroundData | null =>
  state.playgroundSlice.previousData;
