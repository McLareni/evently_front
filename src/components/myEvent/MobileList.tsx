import React, { ReactElement, useState } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GoKebabHorizontal } from 'react-icons/go';
import { IoPricetagOutline, IoTicketOutline } from 'react-icons/io5';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import clsx from 'clsx';

import ConfirmationDeletePopUp from './ConfirmationDeletePopUp';
import DeleteModal from './DeleteModal';
import PopUp from './PopUp';

interface IProps {
  events: Event[];
  // eslint-disable-next-line no-unused-vars
  openPopUp: (id: string) => void;
  popUpId?: string;
  // eslint-disable-next-line no-unused-vars
  deleteEvent: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  clickOutside: (e: HTMLElement) => void;
}

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

const MobileList: React.FC<IProps> = ({
  events,
  openPopUp,
  popUpId,
  deleteEvent,
  clickOutside,
}) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [confirmationDeletePopUp, setConfirmationDeletePopUp] = useState(false);

  const handleDeleteEvent = () => {
    setDeletePopUp(true);
  };

  return (
    <ul
      onClick={e => clickOutside(e.target as HTMLElement)}
      className="flex flex-col gap-4"
    >
      {events.map(event => {
        const dateString = formatDateToDayMonth(event.date.day);
        const day = dateString.split(' ')[0];
        const month = dateString.split(' ')[1].slice(0, 3).toUpperCase();

        return (
          <li
            key={event.id}
            className="w-full p-3 border border-buttonPurple bg-background rounded-[5px] flex gap-5 relative"
          >
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-medium text-2xl font-oswald">{day}</h3>
              <h2 className="font-medium text-2xl font-oswald text-error">
                {month}
              </h2>
              <p className="font-normal text-base leading-[19px] font-lato text-textDark">
                {event.date.time}
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 pr-5">
              <div className="flex flex-col gap-[6px]">
                {event.eventStatus === 'APPROVED' ? (
                  <Link
                    to={`/event/${event.id}`}
                    className="underline text-xl text-textDark leading-6"
                  >
                    {event.title}
                  </Link>
                ) : (
                  <p className="text-base font-bold text-textDark leading-[19px]">
                    {event.title}
                  </p>
                )}
                <p className="text-sm leading-none pb-[1px] w-full text-uploadBtnBg whitespace-normal break-all line-clamp-2 text-ellipsis">
                  {event.eventFormat === 'ONLINE'
                    ? event.eventUrl
                    : `м.${event.location.city}, ${event.location.street}`}
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <div className="flex gap-[6px] items-center">
                  <IoPricetagOutline className="min-w-[18px] min-h-[18px]" />
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-base leading-[19px]">Ціна</p>
                    <p className="text-base font-bold leading-[19px]">
                      {event.price > 0 ? `${event.price}₴` : 'Безкоштовно'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[6px] items-center">
                  <IoTicketOutline className="min-w-[18px] min-h-[18px]" />
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-base leading-[19px]">Продано квитків</p>
                    <p className="text-base font-bold leading-[19px]">
                      {event.soldTickets || 0}/
                      {event.unlimitedTickets ? '∞' : event.numberOfTickets}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaRegMoneyBillAlt className="min-w-[18px] min-h-[18px]" />
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-base leading-[19px]">Прибуток</p>
                    <p className="text-base font-bold leading-[19px]">
                      {event.profit || 0}₴
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p
                  className={clsx(
                    'flex gap-[6px]',
                    status[event.eventStatus].color
                  )}
                >
                  <span>{status[event.eventStatus].svg}</span>
                  {status[event.eventStatus].text}
                </p>
              </div>
            </div>

            <GoKebabHorizontal
              data-name="kebab"
              className="rotate-90 absolute top-2 right-2 w-6 h-6 cursor-pointer"
              onClick={() => openPopUp(event.id)}
            />
            {popUpId === event.id && (
              <PopUp
                id={event.id}
                approved={event.eventStatus === 'APPROVED'}
                deleteEvent={handleDeleteEvent}
              />
            )}
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
          </li>
        );
      })}
    </ul>
  );
};

export default MobileList;
