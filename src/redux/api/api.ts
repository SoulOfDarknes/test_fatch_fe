import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse {
    index: number;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
        fetchResponse: builder.query<ApiResponse, number>({
            query: (index) => `api?index=${index}`,
        }),
    }),
});

export const { useFetchResponseQuery } = apiSlice;