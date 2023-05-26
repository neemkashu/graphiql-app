import { ErrorRespGQL } from '@/common';
import { UNKNOWN_ERROR } from '@/redux/playground/playground.const';
import { UserPlaygroundData } from '@/redux/playground/playground.interface';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const getErrors = (error: FetchBaseQueryError | SerializedError): string[] => {
  const isGraphQLError = 'status' in error && typeof error.status === 'number';

  if (isGraphQLError) {
    const graphQLError = error as ErrorRespGQL;
    return graphQLError.data.errors.map(({ message }): string => message);
  }
  if ('error' in error) {
    return [error.error];
  }
  return [UNKNOWN_ERROR];
};

export const checkDataObjectsEqual = (
  data: UserPlaygroundData,
  previousData: UserPlaygroundData
): boolean =>
  Object.keys(data).every((keyString) => {
    const key = keyString as keyof UserPlaygroundData;
    return data[key] === previousData[key];
  });
