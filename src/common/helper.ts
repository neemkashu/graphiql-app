import { RickAndMortyReq } from '@/redux';
import { store } from '@/redux/store';
import { parse } from 'graphql';

export const makeRequest = (name?: string): RickAndMortyReq => {
  const operation = store.getState().playgroundSlice.operation;
  const vars = store.getState().playgroundSlice.vars;
  return { query: operation, variables: isJson(vars) && JSON.parse(vars), operationName: name };
};

const isJson = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch {
    return false;
  }
  return true;
};

export const getOperationNames = (queryString: string): string[] => {
  const operationNames = [];
  try {
    const document = parse(queryString);

    for (const definition of document.definitions) {
      if (definition.kind === 'OperationDefinition' && definition.name) {
        operationNames.push(definition.name.value);
      }
    }
  } catch {}

  return operationNames;
};

export const nameWithDots = (name: string, length: number): string => {
  return name.length > length ? `${name.slice(0, length)}...` : name;
};
