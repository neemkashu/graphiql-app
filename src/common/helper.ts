import { ErrorRespGQL, UNKNOWN_ERROR } from '@/common';
import { RickAndMortyReq, store } from '@/redux';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const makeRequest = (): RickAndMortyReq => {
  const operation = store.getState().playgroundSlice.operation;
  const vars = store.getState().playgroundSlice.vars;
  return { query: operation, variables: isJson(vars) && JSON.parse(vars) };
};

const isJson = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch {
    return false;
  }
  return true;
};

export const getErrors = (error: FetchBaseQueryError | SerializedError): string[] => {
  if ('status' in error) {
    if (typeof error.status === 'number') {
      const graphQLError = error as ErrorRespGQL;
      return graphQLError.data.errors.map(({ message }): string => message);
    }
  }
  if ('error' in error) {
    return [error.error];
  }
  return [UNKNOWN_ERROR];
};
