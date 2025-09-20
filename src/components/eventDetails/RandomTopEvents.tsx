import React, { useEffect } from 'react';

import { useGetNewEventsQuery } from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { is } from 'date-fns/locale';

import { EventCard } from '../ui';

interface IProps {
  idEvent: string;
}

const RandomTopEvents: React.FC<IProps> = ({ idEvent }) => {
  const city = useAppSelector(state => state.filter.city);
  const {
    data: newEvents,
    refetch,
  } = useGetNewEventsQuery({ city, size: 4 });

  useEffect(() => {
    async function fetchTopEvent() {
      refetch();
    }

    if (idEvent) {
      fetchTopEvent();
    }

    const interval = setInterval(() => {
      if (idEvent) fetchTopEvent();
    }, 10000);

    return () => clearInterval(interval);
  }, [idEvent]);

  if (newEvents?.length === 0) return null;

  return (
    <div className="w-[344px] border-2 rounded-[20px] border-buttonPurple p-4 flex flex-col gap-8">
      {newEvents?.map((event: Event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default RandomTopEvents;
