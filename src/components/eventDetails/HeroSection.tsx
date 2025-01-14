import React, { useState } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { useGetCountLikeEvents } from '@/hooks/query/useGetCountLikeEvent';
import clsx from 'clsx';

import { PopupShareEvent } from '../ui/PopupShareEvent';

interface IProps {
  idEvent: string;
  event: Event;
}

const HeroSection: React.FC<IProps> = ({ idEvent, event }) => {
  const { count: countLike } = useGetCountLikeEvents(idEvent || '');
  const [isLiked, setIsLiked] = useState(false);
  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();
  const user = useAppSelector(selectUser);
  const [showPopupShare, setPopupShare] = useState(false);

  const closePopup = () => {
    setPopupShare(false);
  };

  const toggleIsLiked = () => {
    if (!isLiked) {
      const addLiked = async () => {
        try {
          if (user.id) {
            await addLikedEvent({ userId: user.id, eventId: idEvent, event });
            // reloadLike();
            setIsLiked(true);
          } else {
            return toast.error('Щоб зберегти, потрібно залогінитись!');
          }
        } catch (error) {
          console.log(error);
        }
      };
      addLiked();
    } else {
      const deleteFromLiked = async () => {
        try {
          if (user.id) {
            await deleteLikedEvent({ userId: user.id, eventId: event.id });
            // reloadLike();
            setIsLiked(false);
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      };
      deleteFromLiked();
    }
  };

  return (
    <div className="relative w-auto h-[562px] m-4">
      <div className="absolute inset-0 bg-eventDetails blur-md rounded-[20px]"></div>
      <div className="absolute inset-0 bg-background blur-md rounded-[20px] opacity-50"></div>
      <div className="absolute inset-0 z-10 flex pl-6">
        <div className="flex-1 relative">
          <button
            type="button"
            onClick={toggleIsLiked}
            aria-label="like button"
            className={`focus:outline-none bg-filter-btn-gradient px-4 py-[7px] text-background text-base rounded-[20px] flex gap-[10px] absolute left-[340px] top-[35px] z-20`}
          >
            {isLiked ? (
              <PiHeartFill className={`w-6 h-6 fill-background`} />
            ) : (
              <PiHeartLight className="w-6 h-6 fill-background" />
            )}
            {countLike}
          </button>
          <img
            src={event?.photoUrl}
            alt="PhotoUrl"
            className={clsx(
              'w-[312px] h-[514px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover transition-all',
              { 'animateFirstPhoto ': event?.images }
            )}
          />
          {event?.images?.map((image, index) => (
            <img
              key={image}
              src={image}
              className={clsx(
                'w-[312px] h-[514px] rounded-[20px] absolute top-[calc(50%-50px)] -translate-x-1/2 -translate-y-1/2 object-cover transition-all',
                {
                  'left-[calc(45%-200px)] animateSecondPhoto': index === 0,
                  'left-[calc(45%+200px)] animateThirdPhoto': index === 0,
                }
              )}
            />
          ))}
        </div>
        <div className="flex-1 pl-24 relative">
          <h1 className="text-[64px] text-textDark mb-4">{event?.title}</h1>
          <div className="font-normal text-[20px] text-textDark flex gap-4 mb-10">
            <div
              className={`flex items-center justify-center h-8 rounded-[20px]
                       border-[2px] border-borderColor bg-[#E9E6FF]`}
            >
              <p className="px-4 py-2.5">{event?.type}</p>
            </div>
            <div
              className={clsx(
                `flex items-center justify-center h-8 rounded-[20px]`,
                event?.eventUrl
                  ? 'bg-buttonPurple text-background'
                  : 'bg-lightPurple border border-buttonPurple'
              )}
            >
              <p className="px-4 py-2.5">
                {event?.eventUrl ? 'Онлайн' : 'Офлайн'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {event?.eventUrl ? (
              <p className="font-lato text-xl font-normal text-textDart">
                Онлайн подія
              </p>
            ) : (
              <p className="font-lato text-xl font-normal text-textDart flex gap-6">
                <span>
                  <GrLocation className="w-6 h-6" />
                </span>
                {`${event?.location.city} ${event?.location.street}`}
              </p>
            )}
            <p className="font-lato text-xl font-normal text-textDart flex gap-6">
              <span>
                <AiOutlineClockCircle className="w-6 h-6" />
              </span>
              {event?.date.time} - {event?.date.endTime || 'Do'}
            </p>
            <p className="font-lato text-xl font-normal text-textDart flex gap-6">
              <span>
                <AiOutlineCalendar className="w-6 h-6" />
              </span>
              {formatDateToDayMonth(event?.date.day)}
            </p>
            <p className="font-lato text-2xl font-normal text-textDart flex gap-6 items-center">
              <span>
                <FaRegMoneyBillAlt className="w-6 h-6" />
              </span>
              {event?.price > 0 ? event?.price + ' ₴' : 'Безкоштовно'}
            </p>
          </div>
          <button className="bg-dark-gradient w-[421px] h-12 rounded-[71px_8px] text-background text-2xl mt-[55px] hover:border-4 hover:border-buttonPurple hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive">
            Купити квиток
          </button>
          <button
            onClick={() => setPopupShare(true)}
            className="focus:outline-0 absolute top-[56px] right-[26px]"
          >
            <AiOutlineShareAlt className="w-6 h-6" />
          </button>
          {showPopupShare && <PopupShareEvent closePopup={closePopup} />}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
