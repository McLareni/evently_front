import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EventsApi } from '../events/operations';
import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const EventApi = createApi({
  reducerPath: 'adminEvent',
  tagTypes: ['AdminEvent', 'Events'],
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
    getAdminEvents: builder.query<Event[], void>({
      query: () => 'admin/events',
      keepUnusedDataFor: 1000,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id, eventStatus }) => ({
                type:
                  eventStatus === 'APPROVED'
                    ? ('Events' as const)
                    : ('AdminEvent' as const),
                id,
              })),
              { type: 'AdminEvent', id: 'LIST' },
            ]
          : [{ type: 'AdminEvent', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          data?.forEach(event => {
            if (event.eventStatus === 'APPROVED') {
              dispatch(
                EventsApi.util.upsertQueryData('getEventById', event.id, event)
              );
            }
          });
        } catch (error) {
          console.error('Error updating cache', error);
        }
      },
    }),
    changeEventStatus: builder.mutation<
      { status: number },
      { id: string; action: 'APPROVED' | 'CANCELLED' }
    >({
      query: ({ id, action }) => ({
        url: `/admin/events/${id}/status?status=${action}`,
        method: 'PATCH',
      }),
      async onQueryStarted({ id, action }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status === 200) {
            dispatch(
              EventApi.util.updateQueryData(
                'getAdminEvents',
                undefined,
                draft => {
                  const event = draft.find(event => event.id === id);
                  if (event) {
                    event.eventStatus = action;
                  }
                }
              )
            );
          }
        } catch {
          ///
        }
      },
    }),
  }),
});

export const { useGetAdminEventsQuery, useChangeEventStatusMutation } =
  EventApi;
