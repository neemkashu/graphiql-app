import { RickAndMortyReq } from '@/redux';
import { store } from '@/redux/store';
import { parse } from 'graphql';

export const makeRequest = (name?: string): [RickAndMortyReq, boolean] => {
  const {
    playgroundSlice: { operation, vars },
  } = store.getState();
  const isJsonValid = isJson(vars);
  return [
    { query: operation, variables: isJsonValid && JSON.parse(vars), operationName: name },
    !vars.trim().length || isJsonValid,
  ];
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
    const { definitions } = parse(queryString);

    for (const definition of definitions) {
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
