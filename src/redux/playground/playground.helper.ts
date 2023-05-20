import { ErrorRespGQL } from '@/common';
import { UNKNOWN_ERROR } from '@/redux/playground/playground.const';
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
