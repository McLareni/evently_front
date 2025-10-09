import React, { ReactElement, useState } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import clsx from 'clsx';

import ConfirmationDeletePopUp from './ConfirmationDeletePopUp';
import DeleteModal from './DeleteModal';
import PopUp from './PopUp';

const status: Record<
  // eslint-disable-next-line no-undef
  EventStatus,
  { color: string; text: string; svg: ReactElement }
> = {
  APPROVED: {
    color: 'text-success',
    text: 'Продаж',
    svg: (
      <MdDone className="w-6 h-6 fill-success border-2 rounded-full border-success" />
    ),
  },
  CANCELLED: {
    color: 'text-error',
    text: 'Скасовано',
    svg: (
      <RxCross2 className="w-6 h-6 text-error border-2 rounded-full border-error" />
    ),
  },
  PENDING: {
    color: 'text-[#F4E544]',
    text: 'На перевірці',
    svg: (
      <AiOutlineExclamation className="w-6 h-6 fill-[#F4E544] border-2 rounded-full border-[#F4E544]" />
    ),
  },
};

interface IProps {
  event: Event;
  popUpIsShow: boolean;
  // eslint-disable-next-line no-unused-vars
  openPopUp: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  deleteEvent: (id: string) => void;
}

const EventRow: React.FC<IProps> = ({
  event,
  popUpIsShow,
  openPopUp,
  deleteEvent,
}) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [confirmationDeletePopUp, setConfirmationDeletePopUp] = useState(false);

  const dateString = formatDateToDayMonth(event.date.day);
  const day = dateString.split(' ')[0];
  const month = dateString.split(' ')[1].slice(0, 3).toUpperCase();

  const handleDeleteEvent = () => {
    setDeletePopUp(true);
  };

  return (
    <>
      <td className="h-[148px] w-min flex justify-center p-[5px] items-center">
        <div className="flex flex-col items-center w-min">
          <h3 className="font-medium text-2xl font-oswald leading-[36px]">
            {day}
          </h3>
          <h2 className="font-medium text-2xl font-oswald leading-[36px] text-error">
            {month}
          </h2>
          <p className="font-normal text-base font-lato leading-[19px] text-textDark">
            {event.date.time}
          </p>
        </div>
      </td>
      <td className="w-[100px] p-[5px]">
        <img
          className="w-[100px] h-[100px] rounded-[20px] object-cover"
          src={event.images[0].url}
        />
      </td>
      <td className="h-[148px] p-[5px] max-w-[300px]">
        <div className="flex flex-col justify-between h-[100px] pl-3">
          {event.eventStatus === 'APPROVED' ? (
            <Link
              to={`/event/${event.id}`}
              className="underline text-xl text-textDark leading-6"
            >
              {event.title}
            </Link>
          ) : (
            <p className="text-xl text-textDark leading-6">{event.title}</p>
          )}
          <p className="text-[16px] leading-none pb-[1px] max-w-[300px] text-uploadBtnBg whitespace-normal break-words line-clamp-2 text-ellipsis">
            {event.eventFormat === 'ONLINE'
              ? event.eventUrl
              : `м.${event.location.city}, ${event.location.street}`}
          </p>
        </div>
      </td>
      <td className="p-[5px] pr-[20px] text-xl font-normal">{event.price}₴</td>
      <td className="p-[5px] pr-[20px] text-xl font-normal">
        {event.soldTickets || 0}/
        {event.unlimitedTickets ? '∞' : event.numberOfTickets}
      </td>
      <td className="p-[5px] pr-[20px] text-xl font-normal">
        {event.profit || 0}₴
      </td>
      <td className="p-[5px] relative">
        <div className="flex justify-between">
          <p
            className={clsx('flex gap-[6px]', status[event.eventStatus].color)}
          >
            <span>{status[event.eventStatus].svg}</span>
            {status[event.eventStatus].text}
          </p>
          <GoKebabHorizontal
            data-name="kebab"
            onClick={() => openPopUp(event.id)}
            className="w-6 h-6 rotate-90 rounded-full hover:bg-lightBlue hover:cursor-pointer"
          />
        </div>
        {popUpIsShow && (
          <PopUp
            id={event.id}
            status={event.eventStatus}
            deleteEvent={handleDeleteEvent}
          />
        )}
      </td>
      {deletePopUp && (
        <DeleteModal
          event={event}
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
          setConfirmationDeletePopUp={setConfirmationDeletePopUp}
          deleteEvent={deleteEvent}
        />
      )}
      {confirmationDeletePopUp && (
        <ConfirmationDeletePopUp
          popUpIsShow={confirmationDeletePopUp}
          onClose={() => setConfirmationDeletePopUp(false)}
          idEvent={event.id}
        />
      )}
    </>
  );
};

export default EventRow;
