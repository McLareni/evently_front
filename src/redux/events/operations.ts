import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const EventsApi = createApi({
  reducerPath: 'events',
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
    }),

    getLikedEvents: builder.query<Event[], string>({
      query: userId => `liked-events/${userId}`,
      transformResponse: (response: { eventsList: Event[] }) =>
        response.eventsList,
    }),
    getEventById: builder.query<Event, string>({
      query: id => `events/${id}`,
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
