import React from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import clsx from 'clsx';

interface IProps {
  event: Event;
}

const MainInfo: React.FC<IProps> = ({ event }) => {
  const rowClasses =
    'font-lato lg:text-xl font-normal text-textDart flex lg:gap-6 gap-2';

  return (
    <div className="flex flex-col lg:gap-4 gap-[10px]">
      <p className={rowClasses}>
        <span>
          <AiOutlineCalendar className="w-6 h-6" />
        </span>
        {formatDateToDayMonth(event?.date.day)}
      </p>
      <p className={rowClasses}>
        <span>
          <AiOutlineClockCircle className="w-6 h-6" />
        </span>
        {event?.date.time} - {event?.date.endTime || 'Do'}
      </p>
      {event?.eventUrl ? (
        <p className={rowClasses}>
          <span>
            <GrLocation className="w-6 h-6" />
          </span>
          Онлайн подія
        </p>
      ) : (
        <p className={rowClasses}>
          <span>
            <GrLocation className="w-6 h-6" />
          </span>
          {`${event?.location.city} ${event?.location.street}`}
        </p>
      )}
      <p className={clsx(rowClasses + ' items-center')}>
        <span>
          <FaRegMoneyBillAlt className="w-6 h-6" />
        </span>
        {event?.price > 0 ? `${event?.price} ₴` : 'Безкоштовно'}
      </p>
    </div>
  );
};

export default MainInfo;
