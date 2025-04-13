import React, { useState } from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router';

import clsx from 'clsx';

import userPlaceholder from '../../../../public/images/user-placeholder.png';
import ImageNavigation from './ImageNavigation';
import Stars from './Stars';

interface IProps {
  event?: Event;
  // eslint-disable-next-line no-unused-vars
  openModal: (status: 'APPROVED' | 'CANCELLED') => void;
}

const ModalDecision: React.FC<IProps> = ({ event, openModal }) => {
  const [activeImage, setActiveImage] = useState(1);
  const navigate = useNavigate();

  const images = event?.images.length
    ? [...event.images.map(img => img.url)]
    : [event?.photoUrl || ''];

  const handleChangeActiveImage = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setActiveImage(prev => (prev === event?.images.length ? 1 : prev + 1));
    } else {
      setActiveImage(prev =>
        prev === 1 ? event?.images.length || 0 : prev - 1
      );
    }
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
          {event?.eventStatus === 'DELETE' && (
            <div className="text-center">
              <h1 className="text-error text-4xl font-oswald border-[3px] border-error rounded-[10px] w-fit mx-auto my-9 px-3">
                СКАСОВАНО
              </h1>
              <button className="border border-buttonPurple bg-lightPurple rounded-[10px] p-[7px_8px] text-xl">
                Подивитись причину
              </button>
            </div>
          )}
        </div>

        <div className="relative pb-[100px]">
          <div className="grid grid-cols-custom grid-rows-custom gap-x-[19px]">
            <div>
              <h2 className="text-textDark text-2xl font-medium mb-4">
                {event?.title}
              </h2>
              <div className="font-normal text-md text-textDark flex gap-4">
                <div
                  className={`flex items-center justify-center h-8 rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient`}
                >
                  <p className="px-4 py-2.5">{event?.type}</p>
                </div>

                <div
                  className={clsx(
                    `flex items-center justify-center h-8 rounded-[20px]`,
                    event?.eventUrl
                      ? 'bg-buttonPurple text-background'
                      : 'bg-lightPurple'
                  )}
                >
                  <p className="px-4 py-2.5">
                    {event?.eventUrl ? 'Онлайн' : 'Офлайн'}
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
                onClick={() => navigate(`/user/${event?.organizers.id}`)}
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
                  {event.eventUrl}
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
                {event?.price + ' ₴' || 'необмежена'}
              </p>
              <p className="font-lato text-base leading-[19px] text-textDart flex">
                <span className="font-bold mr-1">Кількість квитків: </span>
                {event?.tickets}{' '}
                <HiOutlineTicket className="h-[19px] w-[19px] ml-1" />
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-textDark font-medium text-2xl leading-[36px] mb-4 mt-8">
              Опис події
            </h2>
            <p className="text-wrap overflow-y-scroll text-base leading-[19px] pb-1 max-h-[114px]">
              {event?.description}
            </p>
          </div>
          {event?.aboutOrganizer && (
            <div>
              <h2 className="text-textDark font-medium text-2xl leading-[36px] mb-4 mt-8">
                Про організатора
              </h2>
              <p className="text-wrap overflow-y-scroll text-base leading-[19px] pb-1 max-h-[80px]">
                {event?.aboutOrganizer}
              </p>
            </div>
          )}
          <div className="flex justify-around gap-8 mt-8 absolute bottom-0 left-[50%] translate-x-[-50%]">
            {event?.eventStatus !== 'CANCELLED' && (
              <button
                onClick={() => openModal('CANCELLED')}
                className="flex gap-2 justify-center items-center w-[180px] h-12 border border-buttonPurple bg-background rounded-[10px] focus:outline-0 hover:shadow-shadowSecondaryBtn"
              >
                <RxCross2 className="h-6 w-6" />
                Відхилити
              </button>
            )}
            {event?.eventStatus !== 'APPROVED' && (
              <button
                onClick={() => openModal('APPROVED')}
                className="flex gap-2 justify-center items-center w-[180px] h-12 border border-buttonPurple bg-lightPurple rounded-[10px] focus:outline-0 hover:shadow-shadowPrimaryBtn active:shadow-primaryBtnActive"
              >
                <MdDone className="h-6 w-6" />
                Схвалити
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDecision;
