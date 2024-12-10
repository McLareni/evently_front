import React, { useState } from 'react';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

import ImageNavigation from './ImageNavigation';
import Stars from './Stars';

interface IProps {
  event?: Event;
}

const ModalDecision: React.FC<IProps> = ({ event }) => {
  const [activeImage, setActiveImage] = useState(1);

  const handleChangeActiveImage = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setActiveImage(prev => (prev === 3 ? 3 : prev + 1));
    } else {
      setActiveImage(prev => (prev === 1 ? 1 : prev - 1));
    }
  };

  console.log(event);

  return (
    <div className="relative p-8 pr-16 flex gap-10 h-[520px] w-[944px]">
      <div className="">
        <img
          src={event?.photoUrl}
          alt="Event"
          className="min-w-[266px] w-[266px] h-[392px] min-h-[392px] rounded-[20px]"
        />
        <ImageNavigation
          activeImage={activeImage}
          changeActiveImage={handleChangeActiveImage}
        />
      </div>

      <div>
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
                className={`flex items-center justify-center h-8 rounded-[20px] bg-lightPurple`}
              >
                <p className="px-4 py-2.5">Офлайн</p>
              </div>
            </div>
          </div>
          <div>
            <img src="" alt="" className="h-[72px] w-[72px] rounded-full" />
            <h2 className="text-textDark font-lato text-2xl underline my-2">
              {event?.organizers[0].name}
            </h2>
            <p className="flex">
              <span className="mr-2">
                <Stars rating={event?.rating || 0} />
              </span>
              ({event?.rating})
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-lato text-base leading-[19px] text-textDart">
              <span className="font-bold">Місце: </span>
              {event?.location.city}, {event?.location.street}
            </p>
            <p className="font-lato text-base leading-[19px] text-textDart">
              <span className="font-bold">Дата: </span>
              {event?.date.day}
            </p>
            <p className="font-lato text-base leading-[19px] text-textDart">
              <span className="font-bold">Час: </span>
              {event?.date.time}
            </p>
            <p className="font-lato text-base leading-[19px] text-textDart">
              <span className="font-bold">Ціна: </span>
              {event?.price}
            </p>
            <p className="font-lato text-base leading-[19px] text-textDart">
              <span className="font-bold">Кількість квитків: </span>
              {event?.tickets}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-textDark font-medium text-2xl leading-[36px] mb-4 mt-[10px]">
            Опис події
          </h2>
          <p className="text-wrap overflow-y-scroll text-base leading-[19px]">
            {event?.description}
          </p>
        </div>
      </div>
      <div className="absolute -bottom-16 right-0 flex gap-8 ">
        <button className="flex gap-2 justify-center items-center w-[180px] h-12 border border-textDark rounded-[10px] bg-lightGreen">
          <MdDone className="h-6 w-6" />
          Схвалити
        </button>
        <button className="flex border justify-center items-center w-[180px] h-12 border-textDark rounded-[10px] bg-lightRed">
          <RxCross2 className="h-6 w-6" />
          Відхилити
        </button>
      </div>
    </div>
  );
};

export default ModalDecision;
