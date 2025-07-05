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
        <h2 className="lg:text-5xl text-[32px] text-textDark mb-8">{title}</h2>
        {seeMoreButton}
      </div>
      <ul
        className={`lg:flex lg:flex-wrap lg:justify-start lg:gap-6 
        grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] justify-center gap-4`}
      >
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
