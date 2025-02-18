import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const UserApi = createApi({
  reducerPath: 'adminUser',
  tagTypes: ['AdminUser'],
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
    getAdminUser: builder.query<User[], void>({
      query: () => 'admin/users',
      keepUnusedDataFor: 600,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'AdminUser' as const, id })),
              { type: 'AdminUser', id: 'LIST' },
            ]
          : [{ type: 'AdminUser', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          data?.forEach(user => {
            dispatch(
              UserApi.util.upsertQueryData('getUserProfile', user.id, user)
            );
          });
        } catch (error) {
          console.error('Error updating cache', error);
        }
      },
    }),
    getUserProfile: builder.query<User, string>({
      query: id => `admin/users/${id}`,
      merge: (existingData, incomingData) => {
        return { ...existingData, ...incomingData };
      },
      providesTags: (result, error, id) => [{ type: 'AdminUser', id }],
    }),

    deleteUser: builder.mutation<{ status: number }, string>({
      query: id => ({ url: `admin/users/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status === 200) {
            dispatch(
              UserApi.util.updateQueryData('getAdminUser', undefined, draft => {
                return draft.filter(user => user.id !== id);
              })
            );
          }
        } catch {
          ///
        }
      },
    }),
    changeStatusUser: builder.mutation<
      { message: string; status: number; timestamp: Date },
      { isBan: boolean; email: string; id: string }
    >({
      query: ({ isBan, email }) => ({
        url: `admin/users/${isBan ? 'ban' : 'unban'}/${email}`,
        method: 'PATCH',
      }),
      async onQueryStarted({ isBan, id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status === 200) {
            dispatch(
              UserApi.util.updateQueryData('getAdminUser', undefined, draft => {
                const user = draft.find(user => user.id === id);
                if (user) {
                  user.status = isBan ? 'BANNED' : 'ACTIVE';
                }
              })
            );
          }
        } catch {
          ///
        }
      },
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetAdminUserQuery,
  useDeleteUserMutation,
  useChangeStatusUserMutation,
} = UserApi;
