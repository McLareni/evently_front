import React, { ReactElement } from 'react';

import { EventCard } from './EventCard';

interface IProps {
  events: Event[];
  title: string;
  seeMoreButton?: ReactElement;
}

const ShortEventList: React.FC<IProps> = ({ events, title, seeMoreButton }) => {
  return (
    <div className="px-3 mt-12">
      <div className="flex justify-between w-full">
        <h2 className="text-5xl text-textDark mb-8">{title}</h2>
        {seeMoreButton}
      </div>
      <ul className="flex gap-6 flex-wrap">
        {events?.map(event => (
          <li key={event.id}>
            <EventCard key={event.id} event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortEventList;
