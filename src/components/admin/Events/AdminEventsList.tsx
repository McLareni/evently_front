import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from '../../ui';

interface IProps {
  events: Event[];
  // eslint-disable-next-line no-unused-vars
  setEvent: (event: Event, target: HTMLElement, actionStatus: 'APPROVED' | 'CANCELLED' | '') => void;
}

export const AdminEventsList: React.FC<IProps> = ({
  events,
  setEvent,
}) => {
  return (
    <div className={'flex flex-wrap justify-start gap-6 mb-3'}>
      {events?.map(event => (
        <EventCard
          key={nanoid()}
          event={event}
          isAdmin={true}
          setEvent={setEvent}
        />
      ))}
    </div>
  );
};
