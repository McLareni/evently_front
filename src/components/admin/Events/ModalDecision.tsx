import React, { useEffect, useState } from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router';

import { useLazyGetReasonQuery, useLazyGetEditedEventQuery } from '@/redux/admin/eventApi';

import clsx from 'clsx';

import ConfirmationDeletePopUp from '@/components/myEvent/ConfirmationDeletePopUp';

import userPlaceholder from '../../../../public/images/user-placeholder.png';
import EditNavigate from './EditNavigate';
import ImageNavigation from './ImageNavigation';
import Stars from './Stars';

interface IProps {
  event?: Event;
  // eslint-disable-next-line no-unused-vars
  openModal: (status: 'APPROVED' | 'CANCELLED', requestId?: string) => void;
}

const ModalDecision: React.FC<IProps> = ({ event, openModal }) => {
  const [activeImage, setActiveImage] = useState(1);
  const navigate = useNavigate();
  const [currVersionEvent, setCurrVersionEvent] = useState<Event | undefined>(
    event
  );
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [getEditedEvents, { data: newEvent }] = useLazyGetEditedEventQuery();
  const [getReason, {data: reason}] = useLazyGetReasonQuery();

  useEffect(() => {
    if (event?.hasUpdateRequest) {
      getEditedEvents(event.id);
    }

    if(event?.hasCancelRequest) {
      getReason(event.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id]);

  const images = currVersionEvent?.images.length
    ? [...currVersionEvent.images.map(img => img.url)]
    : [currVersionEvent?.photoUrl || ''];

  const handleChangeActiveImage = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setActiveImage(prev =>
        prev === currVersionEvent?.images.length ? 1 : prev + 1
      );
    } else {
      setActiveImage(prev =>
        prev === 1 ? currVersionEvent?.images.length || 0 : prev - 1
      );
    }
  };

  const handleLoadNewVersion = (version: 'NEW' | 'OLD') => {
    setCurrVersionEvent(version === 'NEW' ? newEvent : event);
  };

  return (
    <div
      className={clsx(
        'relative p-8 pr-16 flex gap-10 w-[944px] h-min '
        // event?.aboutOrganizer ? 'h-[800px]' : 'h-[630px]'
      )}
    >
      <div className="absolute inset-0 border-2 border-buttonPurple rounded-[20px]"></div>
      <div className="relative flex gap-10 w-full h-full">
        <div className="">
          <img
            src={images[activeImage - 1]}
            alt="Event"
            className="min-w-[266px] w-[266px] h-[392px] min-h-[392px] rounded-[20px]"
          />
          {images.length > 1 && (
            <ImageNavigation
              countImage={images}
              activeImage={activeImage}
              changeActiveImage={handleChangeActiveImage}
            />
          )}
          {event?.hasCancelRequest && (
            <div className="text-center pb-[80px]">
              <h1 className="text-error text-4xl font-oswald border-[3px] border-error rounded-[10px] w-fit mx-auto my-9 px-3">
                СКАСОВАНО
              </h1>
              <button onClick={() => setIsPopUpOpen(true)} className="border border-buttonPurple bg-lightPurple rounded-[10px] p-[7px_8px] text-xl">
                Подивитись причину
              </button>
            </div>
          )}
        </div>

        <div className="relative pb-[80px]">
          <div className="grid grid-cols-custom grid-rows-custom gap-x-[19px]">
            <div>
              <h2 className="text-textDark text-2xl font-medium mb-4">
                {currVersionEvent?.title}
              </h2>
              <div className="font-normal text-md text-textDark flex gap-4">
                <div
                  className={`flex items-center justify-center h-8 rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient`}
                >
                  <p className="px-4 py-2.5">{currVersionEvent?.type}</p>
                </div>

                <div
                  className={clsx(
                    `flex items-center justify-center h-8 rounded-[20px]`,
                    currVersionEvent?.eventUrl
                      ? 'bg-buttonPurple text-background'
                      : 'bg-lightPurple'
                  )}
                >
                  <p className="px-4 py-2.5">
                    {currVersionEvent?.eventUrl ? 'Онлайн' : 'Офлайн'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={
                  event?.organizers?.avatarImage?.url
                    ? event?.organizers?.avatarImage.url
                    : userPlaceholder
                }
                alt=""
                className="h-[72px] w-[72px] rounded-full object-cover"
              />
              <h2
                onClick={() =>
                  navigate(`/user/${event?.organizers.id}`)
                }
                className="text-textDark font-lato text-2xl underline my-2 hover:cursor-pointer"
              >
                {event?.organizers?.name}
              </h2>
              <div className="flex">
                <span className="mr-2">
                  <Stars rating={event?.rating || 0} />
                </span>
                ({event?.rating})
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {event?.eventUrl ? (
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato text-base leading-[19px] text-textDark underline"
                >
                  <span className="font-bold">Місце: </span>
                  {event?.eventUrl}
                </a>
              ) : (
                <p className="font-lato text-base leading-[19px] text-textDart">
                  <span className="font-bold">Місце: </span>
                  {`${event?.location.city}, ${event?.location.street}`}
                </p>
              )}
              <p className="font-lato text-base leading-[19px] text-textDart">
                <span className="font-bold">Дата: </span>
                {event?.date?.day}
              </p>
              <p className="font-lato text-base leading-[19px] text-textDart">
                <span className="font-bold">Час: </span>
                {event?.date?.time}
              </p>
              <p className="font-lato text-base leading-[19px] text-textDart">
                <span className="font-bold">Ціна: </span>
                {currVersionEvent?.price + ' ₴' || 'необмежена'}
              </p>
              <p className="font-lato text-base leading-[19px] text-textDart flex">
                <span className="font-bold mr-1">Кількість квитків: </span>
                {currVersionEvent?.unlimitedTickets
                  ? 'необмежена'
                  : currVersionEvent?.numberOfTickets}
                <HiOutlineTicket className="h-[19px] w-[19px] ml-1" />
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-textDark font-medium text-2xl leading-[36px] mb-4 mt-8">
              Опис події
            </h2>
            <p className="text-wrap overflow-y-scroll text-base leading-[19px] pb-1 max-h-[114px]">
              {currVersionEvent?.description}
            </p>
          </div>
          {currVersionEvent?.aboutOrganizer && (
            <div>
              <h2 className="text-textDark font-medium text-2xl leading-[36px] mb-4 mt-8">
                Про організатора
              </h2>
              <p className="text-wrap overflow-y-scroll text-base leading-[19px] pb-1 max-h-[80px]">
                {currVersionEvent?.aboutOrganizer}
              </p>
            </div>
          )}
          {event?.hasUpdateRequest && (
            <EditNavigate loadNewEvent={handleLoadNewVersion} />
          )}
          <div className="flex justify-around gap-[100px] mt-8 absolute bottom-0 left-[50%] translate-x-[-50%]">
            {event?.eventStatus !== 'CANCELLED' || !event.hasCancelRequest && (
              <button
                onClick={() => openModal('CANCELLED', newEvent?.id)}
                className="flex gap-2 justify-center items-center w-[180px] h-12 border border-buttonPurple bg-background rounded-[10px] focus:outline-0 hover:shadow-shadowSecondaryBtn"
              >
                <RxCross2 className="h-6 w-6" />
                Відхилити
              </button>
            )}
            {event?.eventStatus !== 'APPROVED' && (
              <button
                onClick={() => openModal('APPROVED', event?.hasCancelRequest ? reason?.id : newEvent?.id)}
                className="flex gap-2 justify-center items-center w-[180px] h-12 border border-buttonPurple bg-lightPurple rounded-[10px] focus:outline-0 hover:shadow-shadowPrimaryBtn active:shadow-primaryBtnActive"
              >
                <MdDone className="h-6 w-6" />
                Схвалити
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmationDeletePopUp
        popUpIsShow={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        placeholder={reason}
      />
    </div>
  );
};

export default ModalDecision;
