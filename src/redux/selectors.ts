import { RootState } from '@/redux';

export const operationSelector = (state: RootState): string => state.playgroundSlice.operation;

export const responseSelector = (state: RootState): string => state.playgroundSlice.response;

export const headersSelector = (state: RootState): string => state.playgroundSlice.headers;

export const authStateSelector = (state: RootState): boolean => state.authSlice.authState;
