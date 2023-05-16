/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ORIGIN } from '@/common';
import { RickAndMortyRes } from '@/redux/rickAndMorty/rickAndMorty.type';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ORIGIN,
  }),
  endpoints: (build) => ({
    getData: build.query<RickAndMortyRes, string>({
      query: (query: string) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      }),
    }),
  }),
});

export const { useLazyGetDataQuery } = rickAndMortyApi;
