import { useState } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiFlag } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
  useGetEventByIdQuery,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useGetCountLikeEvents } from '@/hooks/query/useGetCountLikeEvent';
import { useLazyGetAllEventsQueryWithTrigger } from '@/hooks/query/useLazyGetAllEventsQueryWithTrigger';
import { Map, Marker } from '@vis.gl/react-google-maps';
import clsx from 'clsx';

import Stars from '@/components/admin/Events/Stars';
import BackgroundStars from '@/components/eventDetails/BackgroundStars';
import { EventCard } from '@/components/ui';
import { MainLogo } from '@/components/ui/Logo';
import { ShowAllButton } from '@/components/ui/ShowAllButton';
import Spinner from '@/components/ui/Spinner';

const aboutUser =
  'Я – Олена, організатор стендап-шоу, який обожнює створювати унікальні вечори гумору та незабутніх емоцій. ' +
  'Моє головне завдання – забезпечити комфортну атмосферу, де кожен може насолодитися щирими жартами, живим спілкуванням і зарядом позитиву. Завжди відкриваю нові таланти та допомагаю гумористам знайти свого глядача. Давайте разом створювати моменти, які залишаються в серці!';

const EventDetails = () => {
  const { idEvent } = useParams();
  const { data: event, isLoading } = useGetEventByIdQuery(idEvent || '');
  const { events } = useLazyGetAllEventsQueryWithTrigger();
  const { count: countLike } = useGetCountLikeEvents(idEvent || '');
  const [isLiked, setIsLiked] = useState(false);
  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();
  const user = useAppSelector(selectUser);
  const [isShortAboutUser, setIsShortAboutUser] = useState(true);

  const shortAboutUser = aboutUser?.slice(0, 100);

  const topEvents = events
    ?.filter(event => event.category === 'TOP_EVENTS')
    .slice(0, 3);

  const similarEvents = events
    ?.filter(event => event.type === event.type)
    .slice(0, 4);

  const eventByThisUser = events
    ?.filter(event => event.organizers[0].name === event.organizers[0].name)
    .slice(0, 4);

  if (isLoading) {
    return <Spinner />;
  }

  if (!event) {
    return <p>Подія не знайдена</p>;
  }

  const toggleIsLiked = () => {
    if (!isLiked) {
      const addLiked = async () => {
        try {
          if (user.id) {
            await addLikedEvent({ userId: user.id, eventId: event.id, event });
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
    <main className="px-12 pb-10">
      <BackgroundStars />
      <div className="relative z-10">
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
                className="w-[312px] h-[514px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover animateFirstPhoto transition-all"
              />
              <img
                src={event?.photoUrl}
                alt="PhotoUrl"
                className="w-[312px] h-[514px] rounded-[20px] absolute top-[calc(50%-50px)] left-[calc(45%-200px)] -translate-x-1/2 -translate-y-1/2 object-cover animateSecondPhoto transition-all"
              />
              <img
                src={event?.photoUrl}
                alt="PhotoUrl"
                className="w-[312px] h-[514px] rounded-[20px] absolute top-[calc(50%-50px)] left-[calc(45%+200px)] -translate-x-1/2 -translate-y-1/2 object-cover animateThirdPhoto transition-all"
              />
              {event?.images?.map(image => <img key={image} src={image} />)}
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
                  {event?.date.day}
                </p>
                <p className="font-lato text-2xl font-normal text-textDart flex gap-6 items-center">
                  <span>
                    <FaRegMoneyBillAlt className="w-6 h-6" />
                  </span>
                  {event?.price + ' ₴' || 'необмежена'}
                </p>
              </div>
              <button className="bg-dark-gradient w-[421px] h-12 rounded-[71px_8px] text-background text-2xl mt-[55px]">
                Купити квиток
              </button>
              <button className="focus:outline-0 absolute top-[56px] right-[26px]">
                <AiOutlineShareAlt className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-12 flex justify-between">
          <div className="w-[868px]">
            <div>
              <h2 className="text-5xl text-textDark mb-8">Про подію</h2>
              <p className="text-[18px] leading-[27px] text-textDark">
                {event.description}
              </p>
            </div>
            <div>
              <h2 className="text-5xl text-textDark mt-12 mb-8">
                Про організатора
              </h2>
              <div className="flex">
                <img
                  src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                  alt=""
                  className="h-[100px] w-[100px] rounded-full object-cover mr-6"
                />
                <div>
                  <h2 className="text-textDark font-lato text-2xl my-2">
                    {event?.organizers[0].name}
                  </h2>
                  <div className="flex">
                    <span className="mr-2">
                      <Stars rating={event?.rating || 0} />
                    </span>
                    ({event?.rating})
                  </div>
                </div>
              </div>
              <p className="text-[18px] leading-[27px] text-textDark mt-8">
                {isShortAboutUser ? `${shortAboutUser}...` : aboutUser}
                {isShortAboutUser && (
                  <button
                    onClick={() => setIsShortAboutUser(false)}
                    className="flex gap-2 underline text-base focus:outline-none mt-2"
                  >
                    Читати більше
                    <BiChevronDown className="w-6 h-6" />
                  </button>
                )}
              </p>
            </div>
            <div>
              <h2 className="text-5xl text-textDark mt-12 mb-[50px]">
                Адреса події
              </h2>
              <p className="mb-8 text-[20px] text-textDark">
                {event.location.city}, {event.location.street}
              </p>
              <div className="rounded-[20px] overflow-hidden w-fit">
                <Map
                  defaultCenter={{
                    lat: +event.location.latitude,
                    lng: +event.location.longitude,
                  }}
                  defaultZoom={13}
                  className="w-[826px] h-[600px]"
                >
                  <Marker
                    position={{
                      lat: +event.location.latitude,
                      lng: +event.location.longitude,
                    }}
                  />
                </Map>
              </div>
            </div>
            <button className="flex gap-2 p-3 mt-8 rounded-[15px] border border-buttonPurple text-xl text-textDark focus:outline-0">
              Поскаржитись на подію <FiFlag className="w-6 h-6 stroke-error" />
            </button>
          </div>
          <div className="w-[344px] border-2 rounded-[20px] border-buttonPurple p-4 flex flex-col gap-8">
            {topEvents?.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
        <div>
          <div className="relative w-auto h-40 m-4 my-16">
            <div className="absolute inset-0 bg-eventDetails blur-md rounded-[20px]"></div>
            <div className="absolute inset-0 bg-background blur-md rounded-[20px] opacity-50"></div>
            <div className="absolute inset-0 z-10 flex items-center justify-around ">
              <MainLogo />
              <h1 className="text-5xl">
                Не знайшли події своєї мрії? Створи власну!
              </h1>
              <button className="bg-dark-gradient w-[230px] h-12 rounded-[71px_8px] text-background text-xl">
                Створити подію
              </button>
            </div>
          </div>
          <div className="px-3">
            <div className="flex justify-between w-full">
              <h2 className="text-5xl text-textDark mb-8">Схожі події</h2>
              <ShowAllButton style={{ margin: 0 }} />
            </div>
            <ul className="flex gap-6">
              {similarEvents?.map(event => (
                <li key={event.id}>
                  <EventCard key={event.id} event={event} />
                </li>
              ))}
            </ul>
          </div>
          {eventByThisUser && (
            <div className="px-3 mt-12">
              <div className="flex justify-between w-full">
                <h2 className="text-5xl text-textDark mb-8">
                  Більше подій від цього організатора
                </h2>
              </div>
              <ul className="flex gap-6 flex-wrap">
                {eventByThisUser?.map(event => (
                  <li key={event.id}>
                    <EventCard key={event.id} event={event} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
