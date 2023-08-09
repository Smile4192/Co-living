import config from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Example', 'Feed', 'Auth'],
});

export default baseApi;
