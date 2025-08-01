import React, { useEffect } from 'react';

import {
  useGetNewEventsQuery,
} from '@/redux/events/operations';

import { EventCard } from '../ui';

interface IProps {
  idEvent: string;
}

const RandomTopEvents: React.FC<IProps> = ({ idEvent }) => {
  const { data: newEvent, refetch } = useGetNewEventsQuery(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idEvent) refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [idEvent]);

  return (
    <div className="w-[344px] h-fit border-2 rounded-[20px] border-buttonPurple p-4 flex flex-col gap-8">
      {newEvent?.map((event: Event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default RandomTopEvents;
