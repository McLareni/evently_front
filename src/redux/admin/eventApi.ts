import { FilterStatus } from '@/pages/admin/AdminEvents';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EventsApi } from '../events/operations';
import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;

export const EventApi = createApi({
  reducerPath: 'adminEvent',
  tagTypes: ['AdminEvent', 'Count'],
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
    getAdminEvents: builder.query<
      // eslint-disable-next-line no-undef
      { content: Event[]; page: PageType },
      { page: number; status: FilterStatus }
    >({
      query: ({ page, status }) =>
        `admin/events${status ? `/status/${status}` : ''}?page=${page - 1}&size=9`,
      keepUnusedDataFor: 1000,
      providesTags: result =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: 'AdminEvent' as const,
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
      query: ({ id, action }) => {
        const urlToEvent = encodeURIComponent(
          `https://evently-book.vercel.app/event/${id}`
        );
        return {
          url: `/admin/events/${id}/status?status=${action}&urlToEvent=${urlToEvent}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Count'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            EventApi.util.invalidateTags([{ type: 'AdminEvent', id: 'LIST' }])
          );
        } catch {
          ///
        }
      },
    }),
    getCountStatusEvents: builder.query<
      {
        CANCELLED: number;
        PENDING: number;
        APPROVED: number;
      },
      void
    >({
      query: () => '/admin/events/count/status',
      providesTags: ['Count'],
    }),

    getEditedEvent: builder.query<Event, string>({
      query: id => `/admin/events/update/request/${id}`,
      providesTags: (result, error, id) => [{ type: 'AdminEvent', id }],
    }),

    acceptEditEvent: builder.mutation<void, { id: string; requestId: string }>({
      query: ({ id, requestId }) => {
        return {
          url: `/admin/events/${id}?updateRequestId=${requestId}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Count'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            EventApi.util.invalidateTags([{ type: 'AdminEvent', id: 'LIST' }])
          );
        } catch {
          ///
        }
      },
    }),

    rejectEdirtEvent: builder.mutation<void, { id: string; requestId: string }>({
      query: ({ id, requestId }) => {
        return {
          url: `/admin/events/${id}/update/${requestId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Count'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            EventApi.util.invalidateTags([{ type: 'AdminEvent', id: 'LIST' }])
          );
        } catch {
          ///
        }
      },
    }),

    acceptDeleteEvent: builder.mutation<void, { id: string; requestId: string }>(
      {
        query: ({ id, requestId }) => {
          return {
            url: `/admin/events/${id}/cancel/${requestId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Count'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(
              EventApi.util.invalidateTags([{ type: 'AdminEvent', id: 'LIST' }])
            );
          } catch {
            ///
          }
        },
      }
    ),

    getReason: builder.query<Reason, string>({
      query: eventId => `/admin/events/cancel/request/${eventId}`,
    }),
  }),
});

export const {
  useGetAdminEventsQuery,
  useChangeEventStatusMutation,
  useGetCountStatusEventsQuery,
  useLazyGetEditedEventQuery,
  useAcceptEditEventMutation,
  useAcceptDeleteEventMutation,
  useRejectEdirtEventMutation,
  useLazyGetReasonQuery,
} = EventApi;
