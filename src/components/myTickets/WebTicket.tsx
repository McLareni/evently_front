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
  'Не оплачено': {
    color: 'error',
    text: 'НЕ ОПЛАЧЕНО',
  },
  Повернуто: {
    color: 'error',
    text: 'ПОВЕРНУТО',
  },
  Оплачено: {
    color: 'success',
    text: 'ОПЛАЧЕНО',
  },
  Скасовано: {
    color: 'error',
    text: 'СКАСОВАНО',
  },
};

const WebTicket: React.FC<IProps> = ({ ticket }) => {
  const [popUp, setPopUp] = useState(false);

  console.log(ticket);

  return (
    <div className="relative">
      <BgTicket />
      <div className="relative p-4">
        <GoKebabHorizontal
          onClick={() => setPopUp(true)}
          className="rotate-90 absolute top-6 right-6 h-8 w-8"
        ></GoKebabHorizontal>
        {popUp && (
          <PopUp
            closePopUp={() => setPopUp(false)}
            popUpIsOpen={popUp}
            ticket={ticket}
          />
        )}
        <div className="flex gap-6">
          <img
            src={(ticket.images && ticket.images[0]?.url) || ''}
            alt={ticket.title}
            className="w-[244px] h-[257px] rounded-[20px]"
          />
          <div className="text-textDark flex flex-col justify-between">
            <div className="flex flex-col gap-[14px]">
              <h2 className="text-2xl font-medium font-oswald">
                {ticket.title}
              </h2>
              <p className="flex gap-[18px]">
                <AiOutlineCalendar className="w-6 h-6" />
                {formatDateToDayMonth(ticket?.date.day)}
              </p>
              <p className="flex gap-[18px]">
                <FaRegMoneyBillAlt className="w-6 h-6" />
                {ticket.price > 0 ? `${ticket.price} ₴` : 'Безкоштовно'}
              </p>
              <p className="flex gap-[18px]">
                <GrLocation className="w-6 h-6" />
                {ticket.eventFormat === 'ONLINE'
                  ? 'Онлайн захід'
                  : `${ticket.location.city} ${ticket.location.street}`}
              </p>
            </div>
            <div className="flex justify-between gap-[70px] items-end">
              <p
                className={clsx(
                  `border-[3px] border-${STATUSES[ticket?.status]?.color || 'error'} text-${STATUSES[ticket?.status]?.color || 'error'}
                rounded-[10px] px-3 py-1 text-4xl font-oswald`
                )}
              >
                {STATUSES[ticket?.status as string]?.text || 'НЕ ОПЛАЧЕНО'}
              </p>
              <p>
                Номер квитка:{' '}
                <span className="font-bold">{ticket.ticketReference}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTicket;
