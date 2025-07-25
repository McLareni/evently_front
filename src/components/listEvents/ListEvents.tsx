import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from '../ui';

interface ListEventsProps {
  events: Event[];
}

export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  return (
    <div
      className={`lg:flex lg:flex-wrap lg:justify-start lg:gap-6 
        grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] justify-center gap-4`}
    >
      {events.map(event => (
        <EventCard key={nanoid()} event={event} />
      ))}
    </div>
  );
};
