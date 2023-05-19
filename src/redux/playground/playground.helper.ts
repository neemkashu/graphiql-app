import { ErrorRespGQL } from '@/common';
import { UNKNOWN_ERROR } from '@/redux/playground/playground.const';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

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
