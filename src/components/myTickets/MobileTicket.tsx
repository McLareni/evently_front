import React, { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GoKebabHorizontal } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import clsx from 'clsx';

import BgTicket from './BgTicket';
import PopUp from './PopUp';

interface IProps {
  ticket: Ticket;
}

const STATUSES: Record<string, { color: string; text: string }> = {
  Оплачено: {
    color: 'success',
    text: 'ОПЛАЧЕНО',
  },
};

const MobileTicket: React.FC<IProps> = ({ ticket }) => {
  const { event } = ticket;
  const [popUp, setPopUp] = useState(false);

  return (
    <div className="relative">
      <BgTicket />
      <div className="relative p-4">
        <GoKebabHorizontal
          onClick={() => setPopUp(true)}
          className="rotate-90 absolute top-[17px] right-[7px] h-6 w-6"
        ></GoKebabHorizontal>
        {popUp && (
          <PopUp closePopUp={() => setPopUp(false)} popUpIsOpen={popUp} />
        )}
        <div className="flex flex-col gap-[19px]">
          <div className="flex gap-3">
            <img
              src={(event.images && event.images[0]?.url) || ''}
              alt={event.title}
              className="w-[90px] h-[116px] rounded-[5px]"
            />
            <div className="text-textDark flex flex-col justify-between">
              <div className="flex flex-col gap-[8px] text-sm">
                <h2 className="text-base font-bold font-oswald">
                  {event.title}
                </h2>
                <p className="flex gap-[18px]">
                  <AiOutlineCalendar className="w-[18px] h-[18px]" />
                  {formatDateToDayMonth(event?.date.day)}
                </p>
                <p className="flex gap-[18px]">
                  <FaRegMoneyBillAlt className="w-[18px] h-[18px]" />
                  {event.price}
                </p>
                <p className="flex gap-[18px]">
                  <GrLocation className="w-[18px] h-[18px]" />
                  {event.location.city} {event.location.street}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-[14px] items-end ml-1">
            <p
              className={clsx(
                `border-[2px] border-${STATUSES[ticket.status].color} text-${STATUSES[ticket.status].color} 
                rounded-[10px] px-3 py-1 text-base font-oswald`
              )}
            >
              {STATUSES[ticket.status as string].text}
            </p>
            <p className="text-sm whitespace-pre-line">
              Номер квитка:{'\n'}
              <span className="font-bold text-base">{ticket.id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTicket;
