import { FC } from 'react';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';

import { PaymentInfo } from './PaymentInfo';

interface MobileTicketInfoProps {
  event: Event;
}

export const MobileTicketInfo: FC<MobileTicketInfoProps> = ({ event }) => {
  return (
    <div className="flex gap-[16px] px-[10px] p-[10px] mt-[20px] border-[1px] border-buttonPurple rounded-[10px] mb-[24px]">
      <img
        className="h-[66px] object-cover rounded-[10px]"
        src={event?.images[0].url}
        alt="event image"
      />
      <div>
        <p className="mb-[4px]">{event.title}</p>
        <p className="mb-[4px]">
          {event && formatDateToDayMonth(event?.date.day)}
        </p>
        <p className="mb-[4px]">
          {event?.date.time} - {event?.date.endTime}
        </p>
        {event?.eventUrl ? (
          <div className="relative">
            <p>Онлайн</p>
            <PaymentInfo className="right-7" />
          </div>
        ) : (
          <p>
            {event?.location.city}, {event?.location.street}
          </p>
        )}
      </div>
    </div>
  );
};
