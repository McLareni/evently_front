import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const EventApi = createApi({
  reducerPath: 'authApi',
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUser: builder.query<User, string>({
      query: id => `/users/${id}`,
    }),
  }),
});
