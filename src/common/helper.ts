import { RickAndMortyReq } from '@/redux';
import { store } from '@/redux/store';

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
