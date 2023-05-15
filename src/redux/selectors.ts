import { RootState } from '@/redux';

export const operationSelector = (state: RootState): string => state.playgroundSlice.operation;

export const responseSelector = (state: RootState): string => state.playgroundSlice.response;

export const varsSelector = (state: RootState): string => state.playgroundSlice.vars;

export const authStateSelector = (state: RootState): boolean => state.authSlice.authState;
