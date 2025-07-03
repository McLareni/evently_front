import React, { useEffect, useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useGetCountLikeEvent } from '@/hooks/query/useGetCountLikeEvent';
import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { PopupShareEvent } from '../ui/PopupShareEvent';
import EventTags from './EventTags';
import ImageSlider from './ImageSlider';
import MainInfo from './MainInfo';

interface IProps {
  idEvent: string;
  event: Event;
}

const HeroSection: React.FC<IProps> = ({ idEvent, event }) => {
  const [showPopupShare, setPopupShare] = useState(false);
  const { data: likedEventsAll } = useGetLikedEventsWithSkip();
  const [isLiked, setIsLiked] = useState(false);

  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();
  const user = useAppSelector(selectUser);
  const { count: countLike, getLike } = useGetCountLikeEvent(idEvent || '');

  const toggleIsLiked = async () => {
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
      await addLiked();
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
      await deleteFromLiked();
    }

    getLike();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idEvent]);

  useEffect(() => {
    setIsLiked(() => {
      const isLikedEvent = likedEventsAll?.find(event => event.id === idEvent);

      return isLikedEvent ? true : false;
    });
  }, [setIsLiked, idEvent, likedEventsAll]);

  const closePopup = () => {
    setPopupShare(false);
  };

  return (
    <div className="relative w-auto h-[562px] m-4">
      <div className="absolute inset-0 bg-eventDetails blur-md rounded-[20px]"></div>
      <div className="absolute inset-0 bg-background blur-md rounded-[20px] opacity-50"></div>
      <div className="absolute inset-0 z-10 flex pl-6">
        <ImageSlider
          toggleIsLiked={toggleIsLiked}
          countLike={+countLike}
          isLiked={isLiked}
          images={
            event?.images?.length
              ? [...event.images.map(img => img.url)]
              : [event.photoUrl || '']
          }
        />
        <div className="flex-1 pl-24 relative">
          <h1 className="text-[36px] text-textDark mb-4 pr-12 line-clamp-2">
            {event?.title}
          </h1>
          <EventTags type={event?.type} eventUrl={event?.eventUrl} />

          <MainInfo event={event} />
          <Link to={`buy_ticket`}>
            <button
              type="button"
              className={`bg-dark-gradient w-[421px] h-12 rounded-[71px_8px] text-background text-2xl
                mt-[55px] hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive`}
            >
              {event.price === 0 && event.eventFormat === 'ONLINE'
                ? 'Зареєструватись'
                : 'Купити квиток'}
            </button>
          </Link>
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
