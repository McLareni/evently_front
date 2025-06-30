import React, { useEffect } from 'react';

import { useLazyGetRandomTopEventsQuery } from '@/redux/events/operations';

import { EventCard } from '../ui';

interface IProps {
  idEvent: string;
}

const RandomTopEvents: React.FC<IProps> = ({ idEvent }) => {
  const [refreshTopEvents, { data: topEventsData }] =
    useLazyGetRandomTopEventsQuery();

  useEffect(() => {
    async function fetchTopEvent() {
      const responseTopEvents = await refreshTopEvents();

      if (responseTopEvents.status === 'uninitialized') {
        refreshTopEvents();
      }
    }

    if (idEvent) {
      fetchTopEvent();
    }

    const interval = setInterval(() => {
      if (idEvent) fetchTopEvent();
    }, 10000);

    return () => clearInterval(interval);
  }, [idEvent]);

  return (
    <div className="w-[344px] border-2 rounded-[20px] border-buttonPurple p-4 flex flex-col gap-8">
      {topEventsData?.map((event: Event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default RandomTopEvents;
