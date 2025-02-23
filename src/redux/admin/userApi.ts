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
    getAdminUser: builder.query<
      // eslint-disable-next-line no-undef
      { content: User[]; page: PageType },
      { page: number; size: number; col: string; direction: string }
    >({
      query: ({ page, size, col, direction }) =>
        `admin/users?page=${page - 1}&size=${size}&sort=${col},${direction}`,
      keepUnusedDataFor: 600,
      providesTags: result =>
        result?.content
          ? [
              ...result.content.map(({ id }) => ({
                type: 'AdminUser' as const,
                id,
              })),
              { type: 'AdminUser', id: 'LIST' },
            ]
          : [{ type: 'AdminUser', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          data.content?.forEach(user => {
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
      keepUnusedDataFor: 600,
    }),

    deleteUser: builder.mutation<{ status: number }, string>({
      query: id => ({ url: `admin/users/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          const currentArg = getState().adminUser.queries['getAdminUser']
            ?.originalArgs as {
            page: number;
            size: number;
            col: string;
            direction: string;
          };
          if (data.status === 200) {
            dispatch(
              UserApi.util.updateQueryData(
                'getAdminUser',
                { ...currentArg },
                draft => {
                  const updatedContent = draft.content.filter(
                    user => user.id !== id
                  );
                  return { ...draft, content: updatedContent };
                }
              )
            );
            dispatch(
              UserApi.util.invalidateTags([{ type: 'AdminUser', id: 'LIST' }])
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
      async onQueryStarted(
        { isBan, id },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data } = await queryFulfilled;

          const currentArg = getState().adminUser.queries['getAdminUser']
            ?.originalArgs as {
            page: number;
            size: number;
            col: string;
            direction: string;
          };
          if (data.status === 200) {
            dispatch(
              UserApi.util.updateQueryData(
                'getAdminUser',
                { ...currentArg },
                draft => {
                  const user = draft.content.find(user => user.id === id);
                  if (user) {
                    user.status = isBan ? 'BANNED' : 'ACTIVE';
                  }
                }
              )
            );
            dispatch(UserApi.util.invalidateTags([{ type: 'AdminUser', id }]));
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
