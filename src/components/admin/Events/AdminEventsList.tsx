import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from '../../ui';

interface IProps {
  events: Event[];
  // eslint-disable-next-line no-unused-vars
  setEvent: (event?: Event) => void;
}

export const AdminEventsList: React.FC<IProps> = ({ events, setEvent }) => {
  return (
    <div className={`flex flex-wrap justify-start gap-6`}>
      {events?.map(event => (
        <EventCard
          key={nanoid()}
          event={event}
          status={true}
          setEvent={setEvent}
        />
      ))}
    </div>
  );
};
