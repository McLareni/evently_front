import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const EventsApi = createApi({
  reducerPath: 'events',
  tagTypes: ['Events', 'LikedEvents'],
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
    getAllEvents: builder.query<Event[], void>({
      query: () => 'events',
      keepUnusedDataFor: 1000,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Events' as const, id })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          data?.forEach(event => {
            dispatch(
              EventsApi.util.upsertQueryData('getEventById', event.id, event)
            );
          });
        } catch (error) {
          console.error('Error updating cache', error);
        }
      },
    }),
    getEventById: builder.query<Event, string>({
      query: id => `events/${id}`,
      providesTags: (result, error, id) => [{ type: 'Events', id }],
      keepUnusedDataFor: 1000,
    }),

    getLikedEvents: builder.query<Event[], string>({
      query: userId => `liked-events/${userId}`,
      transformResponse: (response: { eventsList: Event[] }) =>
        response.eventsList,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'LikedEvents' as const, id })),
              { type: 'LikedEvents', id: 'LIST' },
            ]
          : [{ type: 'LikedEvents', id: 'LIST' }],
    }),

    addLikedEvent: builder.mutation<
      Event,
      { userId: string; eventId: string; event: Event }
    >({
      query: ({ userId, eventId }) => ({
        url: 'liked-events',
        method: 'POST',
        body: { userId, eventId },
      }),
      async onQueryStarted({ userId, event }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          EventsApi.util.updateQueryData('getLikedEvents', userId, draft => {
            draft.push(event);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    deleteLikedEvent: builder.mutation<
      Event,
      { userId: string; eventId: string }
    >({
      query: ({ userId, eventId }) => ({
        url: 'liked-events',
        method: 'DELETE',
        body: { userId, eventId },
      }),
      async onQueryStarted({ userId, eventId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          EventsApi.util.updateQueryData('getLikedEvents', userId, draft => {
            const updatedEvents = draft.filter(item => item.id !== eventId);
            return updatedEvents;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useLazyGetAllEventsQuery,
  useGetLikedEventsQuery,
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
  useGetEventByIdQuery,
} = EventsApi;
