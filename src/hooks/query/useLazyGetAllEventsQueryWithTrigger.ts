import { useEffect } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';


interface IuseLazyGetAllEventsQueryWithTriggerProps {
  page?: number,
  size?: number
}

export function useLazyGetAllEventsQueryWithTrigger({page = 0, size = 21}: IuseLazyGetAllEventsQueryWithTriggerProps = {}) {
  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  useEffect(() => {
    trigger({page, size});
  }, [trigger, page, size]);

  return { events, isLoading };
}
