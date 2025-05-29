import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineExclamation } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { MdDone } from 'react-icons/md';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { SharedBtn } from './SharedBtn';

interface EventCardProps {
  event: Event;
  top?: boolean;
  isAdmin?: boolean;
  isEventCreated?: boolean;

  setEvent?: (
    // eslint-disable-next-line no-unused-vars
    event: Event,
    // eslint-disable-next-line no-unused-vars
    target: HTMLElement,
    // eslint-disable-next-line no-unused-vars
    actionStatus: 'APPROVED' | 'CANCELLED' | ''
  ) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  top = false,
  isAdmin = false,
  isEventCreated = false,
  setEvent = () => {},
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const width = useScreenWidth();
  const isMobile = width < 1024;

  const {
    id: eventId,
    title,
    date,
    category,
    eventUrl,
    price,
    location,
    type,
    images,
  } = event;

  const { id: userId } = useAppSelector(selectUser);

  const { data: likedEventsAll } = useGetLikedEventsWithSkip();
  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();
  const navigate = useNavigate();

  const address = location.city + ', ' + location.street;
  const slicedStreet = () => {
    if (address.length > 27) {
      return address.slice(0, 27) + '...';
    } else {
      return address;
    }
  };

  const toggleIsLiked = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      const addLiked = async () => {
        try {
          if (userId) {
            await addLikedEvent({ userId, eventId, event });
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
          if (userId) {
            await deleteLikedEvent({ userId, eventId });
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      };
      deleteFromLiked();
    }
  };

  const formattedDate = formatDateToDayMonth(date?.day);

  const handleOnClick = (e: React.MouseEvent) => {
    if (isEventCreated) return;
    if (isAdmin) {
      setEvent(event, e.target as HTMLElement, '');
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  const navigateToEvent = () => {
    if (isEventCreated) return;
    navigate(`/event/${eventId}`);
  };

  useEffect(() => {
    if (likedEventsAll) {
      setIsLiked(likedEventsAll.some(item => item.id === event.id));
    }
  }, [event.id, likedEventsAll]);

  return (
    <div
      onClick={e => handleOnClick(e)}
      id={`${eventId}`}
      className={`group relative flex overflow-hidden items-start rounded-[20px] shadow-eventCardShadow lg:w-[312px] lg:h-[514px] w-[171px] h-[309px] ${
        top ? 'mb-[10px]' : ''
      }${isAdmin && 'hover:cursor-pointer'}`}
    >
      {images[0] && images[0].url && (
        <img src={images[0].url} alt={title} width={'100%'} />
      )}
      <div className={`flex absolute justify-between lg:p-6 p-3 w-full`}>
        {category === 'TOP_EVENTS' && event.eventStatus === 'APPROVED' && (
          <div
            className="flex justify-center items-center lg:w-[58px] w-[50px] lg:h-[33px] h-[22px] 
          bg-badge-gradient rounded-[20px] lg:text-base text-xs"
          >
            <span className="text-background">New</span>
          </div>
        )}
        {!isAdmin && !isEventCreated && (
          <button
            type="button"
            onClick={e => toggleIsLiked(e)}
            aria-label="like button"
            className={`focus:outline-none ml-auto bg-background lg:w-[32px] lg:h-[32px] w-6 h-6 flex items-center justify-center rounded-full opacity-60`}
          >
            {isLiked ? (
              <PiHeartFill
                className={`lg:w-6 lg:h-6 h-[18px] w-[18px] text-borderColor`}
              />
            ) : (
              <PiHeartLight className="lg:w-6 lg:h-6 h-[18px] w-[18px] text-borderColor" />
            )}
          </button>
        )}
      </div>
      <div
        className={`absolute flex flex-col items-start gap-2 w-full lg:py-4 lg:px-5 p-3 lg:h-[365px] h-[190px]
          rounded-t-[20px] bg-hoverCard transition-all ease-in-out duration-300 lg:-bottom-[101px] bottom-0
          ${!isMobile ? (category === 'TOP_EVENTS' && !isAdmin ? 'group-hover:-bottom-0' : 'group-hover:-bottom-10') : ''}
          
          `}
      >
        <div className="flex justify-between w-full">
          <div
            className={`flex items-center justify-center lg:h-[33px] h-[20px] rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient`}
          >
            <p
              className={`font-normal text-nowrap lg:text-base text-xs text-textDark lg:px-4 px-3`}
            >
              {type}
            </p>
          </div>
          {isAdmin && (
            <div
              className={`w-10 h-10 rounded-full border-2 flex justify-center items-center 
              ${event.eventStatus === 'APPROVED' && 'border-success'} 
              ${event.eventStatus === 'PENDING' && 'border-[#F4E544]'} 
              ${event.eventStatus === 'CANCELLED' && 'border-error'}
              `}
            >
              {event.eventStatus === 'APPROVED' && (
                <MdDone className="w-6 h-6 fill-success" />
              )}
              {event.eventStatus === 'CANCELLED' && (
                <RxCross2 className="w-6 h-6 text-error" />
              )}
              {event.eventStatus === 'PENDING' && (
                <AiOutlineExclamation className="w-6 h-6 fill-[#F4E544]" />
              )}
            </div>
          )}
        </div>

        <h2
          className={`lg:min-h-[71px] min-h-[52px] lg:text-2xl text-base text-textDark line-clamp-2`}
        >
          {title}
        </h2>

        <ul
          className={`flex flex-col lg:gap-[18px] gap-2 font-normal text-md text-textDark justify-between w-full`}
        >
          <li className="flex items-center lg:gap-[18px] gap-2 text-nowrap">
            <AiOutlineCalendar
              size={isMobile ? '16px' : '24px'}
              className={`${isMobile ? 'min-w-4' : 'min-w-6'}`}
            />
            <p className="lg:text-base text-sm leading-none lg:leading-normal">{`${formattedDate}, ${date?.time}`}</p>
          </li>
          <li className="flex items-center lg:gap-[18px] gap-2  min-h-[28px]">
            <GrLocation
              size={isMobile ? '16px' : '24px'}
              className={`${isMobile ? 'min-w-4' : 'min-w-6'}`}
            />
            {eventUrl ? (
              <p className="lg:text-base text-sm">Онлайн</p>
            ) : (
              <p className="lg:text-base text-sm leading-none lg:leading-normal line-clamp-2">
                {slicedStreet()}
              </p>
            )}
          </li>
          <li className="flex items-center lg:gap-[18px] gap-2">
            <FaRegMoneyBillAlt
              size={isMobile ? '16px' : '24px'}
              className={`${isMobile ? 'min-w-4' : 'min-w-6'}`}
            />
            {price === 0 ? (
              <p className="text-error lg:text-base text-sm">Безкоштовно</p>
            ) : (
              <p className="lg:text-base text-sm">{`${price} ₴`}</p>
            )}
          </li>
        </ul>
        {!isMobile &&
          (isAdmin ? (
            <div className="w-full flex justify-center gap-4 text-base mt-4">
              <>
                {event.eventStatus !== 'CANCELLED' &&
                  !event?.hasCancelRequest && (
                    <button
                      aria-label="reject button"
                      onClick={e =>
                        setEvent(event, e.target as HTMLElement, 'CANCELLED')
                      }
                      className="border border-buttonPurple rounded-[10px] w-[110px] h-[33px] focus:outline-0 flex-1 hover:shadow-shadowSecondaryBtn"
                    >
                      Відхилити
                    </button>
                  )}
                {event.eventStatus !== 'APPROVED' && (
                  <button
                    aria-label="approve button"
                    onClick={e =>
                      setEvent(event, e.target as HTMLElement, 'APPROVED')
                    }
                    className="border border-buttonPurple bg-lightPurple rounded-[10px] w-[110px] h-[33px] focus:outline-0 flex-1 hover:shadow-shadowPrimaryBtn active:shadow-primaryBtnActive"
                  >
                    Схвалити
                  </button>
                )}
              </>
            </div>
          ) : (
            <>
              <SharedBtn
                type="button"
                primary
                className="w-[230px] h-12 mx-auto mt-4"
                onClick={navigateToEvent}
              >
                Хочу
              </SharedBtn>
              <p className="text-error mx-auto">Залишилось 30 квитків</p>
            </>
          ))}
      </div>
    </div>
  );
};
