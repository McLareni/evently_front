import { useEffect, useState } from 'react';
import { FiFlag } from 'react-icons/fi';
import { useParams } from 'react-router';

import {
  useGetAllEventsFilteredQuery,
  useLazyGetAllEventsFilteredQuery,
  useLazyGetEventByIdQuery,
  useLazyGetUserEventsQuery,
} from '@/redux/events/operations';

import AboutUser from '@/components/eventDetails/AboutUser';
import BackgroundStars from '@/components/eventDetails/BackgroundStars';
import CreateBtnSection from '@/components/eventDetails/CreateBtnSection';
import HeroSection from '@/components/eventDetails/HeroSection';
import { EventCard } from '@/components/ui';
import { GoogleMap } from '@/components/ui/GoogleMap';
import ShortEventList from '@/components/ui/ShortEventList';
import { ShowAllButton } from '@/components/ui/ShowAllButton';
import Spinner from '@/components/ui/Spinner';

const EventTypes: Record<string, string> = {
  'Усі події': 'ALL_EVENTS',
  Інше: 'OTHER',
  'Спортивні заходи': 'SPORTS_EVENTS',
  'Бізнес та нетворкінг': 'BUSINESS_NETWORKING',
  'Майстер класи': 'MASTER_CLASS',
  Концерти: 'CONCERTS',
  'Під домом': 'UNDER_HOUSE',
  'Stand-up': 'STAND_UP',
  Популярні: 'POPULAR',
};

const EventDetails = () => {
  const { idEvent } = useParams();
  const [trigger, { data: event, isLoading }] = useLazyGetEventByIdQuery();
  const [refreshTopEvents, { data: topEvents }] =
    useLazyGetAllEventsFilteredQuery();
  const { data: similarEvents } = useGetAllEventsFilteredQuery({
    page: 0,
    size: 4,
    filter: {
      eventTypes: [EventTypes[event?.type || '']],
    },
  });
  const [userEventstrigger, { data: userEvents }] = useLazyGetUserEventsQuery();
  const [randomTopEvents, setRandomTopEvents] = useState<Event[] | undefined>(
    topEvents?.slice(0, 3)
  );

  const userId = event && event.organizers && event.organizers.id;

  const filteredUserEvents =
    userEvents &&
    userEvents.filter(
      ({ eventStatus, id }) => eventStatus === 'APPROVED' && id !== idEvent
    );

  // const topEvents = events?.filter(
  //   (event: Event) => event.category === 'TOP_EVENTS'
  // );

  useEffect(() => {
    async function fetchEvent() {
      const response = await trigger(idEvent || '');
      if (response.status === 'uninitialized') {
        fetchEvent();
      }
      const responseTopEvents = await refreshTopEvents({
        page: 0,
        size: 20,
        filter: {
          isPopular: true,
        },
      });
      if (responseTopEvents.status === 'uninitialized') {
        refreshTopEvents({
          page: 0,
          size: 20,
          filter: {
            isPopular: true,
          },
        });
      }
    }

    if (idEvent) fetchEvent();
  }, [idEvent, trigger]);

  useEffect(() => {
    if (userId) {
      userEventstrigger(userId);
    }
  }, [userId, userEventstrigger]);

  // useEffect(() => {
  //   const randomEvents = topEvents?.sort(() => Math.random() - 0.5).slice(0, 3);
  //   if (!randomTopEvents && randomEvents) {
  //     setRandomTopEvents(randomEvents);
  //   }
  //   if (randomEvents) {
  //     let interval = setInterval(() => {
  //       setRandomTopEvents(randomEvents);
  //     }, 10000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [randomTopEvents, topEvents]);

  console.log(topEvents);

  if (isLoading) {
    return <Spinner />;
  }

  if (!event) {
    return <p>Подія не знайдена</p>;
  }

  return (
    <main className="px-12 pb-10">
      <BackgroundStars />
      <div className="relative z-10">
        <HeroSection
          event={event}
          idEvent={idEvent || ''}
          key={JSON.stringify(event)}
        />
        <div className="px-6 py-12 flex justify-between">
          <div className="w-[868px]">
            <div>
              <h2 className="text-5xl text-textDark mb-8">Про подію</h2>
              <p className="text-[18px] leading-[27px] text-textDark">
                {event.description}
              </p>
            </div>
            <AboutUser
              organizer={event.organizers}
              rating={event.rating}
              aboutUser={event?.aboutOrganizer || ''}
            />
            {event.eventFormat === 'OFFLINE' && (
              <div>
                <h2 className="text-5xl text-textDark mt-12 mb-[50px]">
                  Адреса події
                </h2>
                <p className="mb-8 text-[20px] text-textDark">
                  {event.location.city}, {event.location.street}
                </p>
                <div className="rounded-[20px] overflow-hidden w-fit">
                  <GoogleMap events={[event]} />
                </div>
              </div>
            )}
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
          <CreateBtnSection />
          <ShortEventList
            title="Схожі події"
            events={similarEvents || []}
            seeMoreButton={<ShowAllButton style={{ margin: 0 }} />}
          />
          {filteredUserEvents && filteredUserEvents.length > 0 && (
            <ShortEventList
              title="Більше подій від цього організатора"
              events={filteredUserEvents}
              seeMoreButton={<ShowAllButton style={{ margin: 0 }} />}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
