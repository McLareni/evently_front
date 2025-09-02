import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const AuthApi = createApi({
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
    getBalance: builder.query<{ response: number }, string>({
      query: id => `users/organizers/funds/${id}`,
    }),
    getWithdrawBalance: builder.query<{ response: number }, string>({
      query: id => `users/organizers/funds/withdrawn/${id}`,
    }),
    createFundRequest: builder.mutation<
      { response: string; status: number },
      {
        body: {
          cartNumber: string;
        };
        id: string;
      }
    >({
      query: query => ({
        url: `pay/funds/${query.id}`,
        method: 'POST',
        body: query.body,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetBalanceQuery,
  useGetWithdrawBalanceQuery,
  useCreateFundRequestMutation,
} = AuthApi;
