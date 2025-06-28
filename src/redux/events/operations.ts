import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export interface IFilter {
  eventTypes?: string[];
  isPopular?: boolean;
  isNearby?: boolean;
  latitude?: number;
  longitude?: number;
  isThisWeek?: boolean;
  dayRange?: { startDay?: string; endDay?: string };
  isToday?: boolean;
  isOnTheWeekend?: boolean;
  isFree?: boolean;
  isUnder500?: boolean;
  priceRange?: {
    priceFrom?: number;
    priceTo?: number;
  };
}

export const EventsApi = createApi({
  reducerPath: 'events',
  tagTypes: ['Events', 'LikedEvents', 'MyEvents', 'UserEventsList'],
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllEvents: builder.query<
      Event[],
      { page?: number; size?: number } | void
    >({
      query: arg => ({
        url: `events?page=${arg?.page ?? 0}&size=${arg?.size ?? 20}`,
      }),
      keepUnusedDataFor: 1000,
      transformResponse: (result?: { content?: Event[] }) =>
        result?.content ?? [],
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Events' as const,
                id,
              })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data);

          if (data) {
            data.forEach(event => {
              dispatch(
                EventsApi.util.upsertQueryData('getEventById', event.id, event)
              );
            });
          }
        } catch (error) {
          console.error('Error updating cache', error);
        }
      },
    }),

    getAllEventsFiltered: builder.query<
      Event[],
      { page?: number; size?: number; filter?: IFilter } | void
    >({
      query: arg => ({
        url: `events/filtered?page=${arg?.page ?? 0}&size=${arg?.size ?? 20}`,
        method: 'POST',
        body: arg?.filter,
      }),
      keepUnusedDataFor: 1000,
      transformResponse: (result?: { content?: Event[] }) =>
        result?.content ?? [],
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Events' as const,
                id,
              })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data);

          if (data) {
            data.forEach(event => {
              dispatch(
                EventsApi.util.upsertQueryData('getEventById', event.id, event)
              );
            });
          }
        } catch (error) {
          console.error('Error updating cache', error);
        }
      },
    }),

    getEventById: builder.query<Event, string>({
      query: id => `events/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Events', id: id.toString() }] : [],
      keepUnusedDataFor: 600,
    }),

    getAllMyEvents: builder.query<Event[], { id: string; page: number }>({
      query: ({ id, page }) => `events/user/${id}?page=${page}&size=${5}`,
      transformResponse: (result: { content: Event[] }) =>
        result?.content ?? [],
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'MyEvents' as const,
                id,
              })),
              { type: 'MyEvents', id: 'LIST' },
            ]
          : [{ type: 'MyEvents', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

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
    deleteMyEvent: builder.mutation<
      string,
      { idEvent: string; contact?: string; reason?: string }
    >({
      query: ({ idEvent, reason, contact }) => {
        const ticketWasSold = !!contact;
        return {
          url: ticketWasSold
            ? `events/cancel/request/${idEvent}`
            : `events/${idEvent}`,
          body: ticketWasSold ? { reason, contact } : undefined,
          method: ticketWasSold ? 'POST' : 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'MyEvents', id: 'LIST' }],
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
  useGetAllEventsQuery,
  useGetLikedEventsQuery,
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
  useGetEventByIdQuery,
  useGetAllMyEventsQuery,
  useLazyGetAllMyEventsQuery,
  useLazyGetAllEventsFilteredQuery,
  useGetAllEventsFilteredQuery,
  useLazyGetEventByIdQuery,
  useDeleteMyEventMutation,
} = EventsApi;
