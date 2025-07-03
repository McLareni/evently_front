import React from 'react';

import clsx from 'clsx';

interface IProps {
  type?: string;
  eventUrl?: string;
}

const EventTags: React.FC<IProps> = ({ type, eventUrl }) => (
  <div className="font-lato font-normal leading-normal lg:text-[20px] text-base text-textDark flex lg:gap-4 gap-2 lg:mb-10 mb-[6px]">
    <div className="flex items-center justify-center lg:h-10 h-8 rounded-[20px] border lg:border-[2px] border-borderColor bg-[#E9E6FF]">
      <p className="lg:px-4 lg:py-2.5 px-2 min-w-[85px] text-center">
        {type}
      </p>
    </div>
    <div
      className={clsx(
        'flex items-center justify-center lg:h-10 h-8 rounded-[20px]',
        eventUrl
          ? 'bg-buttonPurple text-background'
          : 'bg-lightPurple border border-buttonPurple'
      )}
    >
      <p className="lg:px-4 lg:py-2.5 px-2 min-w-[85px] text-center">
        {eventUrl ? 'Онлайн' : 'Офлайн'}
      </p>
    </div>
  </div>
);

export default EventTags;
