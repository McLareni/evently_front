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
    // eslint-disable-next-line no-undef
    getAdminEvents: builder.query<{ content: Event[]; page: PageType }, number>(
      {
        query: page => `admin/events?page=${page}&size=9`,
        keepUnusedDataFor: 1000,
        providesTags: result =>
          result
            ? [
                ...result.content.map(({ id, eventStatus }) => ({
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
            data?.content?.forEach(event => {
              if (event.eventStatus === 'APPROVED') {
                dispatch(
                  EventsApi.util.upsertQueryData(
                    'getEventById',
                    event.id,
                    event
                  )
                );
              }
            });
          } catch (error) {
            console.error('Error updating cache', error);
          }
        },
      }
    ),
    changeEventStatus: builder.mutation<
      { status: number },
      { id: string; action: 'APPROVED' | 'CANCELLED' }
    >({
      query: ({ id, action }) => ({
        url: `/admin/events/${id}/status?status=${action}`,
        method: 'PATCH',
      }),
      async onQueryStarted(
        { id, action },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data } = await queryFulfilled;

          const currentPage =
            (
              getState().adminEvent.queries['getAdminEvents']?.originalArgs as {
                page: number;
              }
            ).page || 0;
          if (data.status === 200) {
            dispatch(
              EventApi.util.updateQueryData(
                'getAdminEvents',
                currentPage,
                draft => {
                  const event = draft.content.find(event => event.id === id);
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
