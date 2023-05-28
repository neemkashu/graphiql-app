/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ORIGIN } from '@/common';
import { RickAndMortyReq, RickAndMortyRes } from '@/redux';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ORIGIN,
  }),
  endpoints: ({ query }) => ({
    getData: query<RickAndMortyRes, RickAndMortyReq>({
      query: ({ query, variables, operationName }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
          operationName,
        }),
      }),
    }),
    getSchema: query<IntrospectionQuery, void>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      }),
      keepUnusedDataFor: 9999,
      transformResponse: (res: { data: IntrospectionQuery }) => res.data,
    }),
  }),
});

export const { useLazyGetDataQuery, useLazyGetSchemaQuery } = rickAndMortyApi;
