import { useEffect, useState } from 'react';

import {
  useLazyGetAllEventsQuery,
  useLazyGetNewEventsQuery,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useScrollToTop } from '@/hooks/useScrollToTop';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { Container } from '@/components/container/Container';
import { FAQ } from '@/components/faq/FAQ';
import { Hero } from '@/components/hero/Hero';
import { Main } from '@/components/main/Main';
import { Organizers } from '@/components/organizers/Organizers';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { ShowAllButton } from '@/components/ui/ShowAllButton';
import Spinner from '@/components/ui/Spinner';

const Home: React.FC = () => {
  const city = useAppSelector(state => state.filter.city);

  const [events, setEvents] = useState<Event[]>([]);
  const [newEvents, setNewEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fetchNewEvents] = useLazyGetNewEventsQuery();
  const [fetchEvents] = useLazyGetAllEventsQuery();

  useScrollToTop();

  useEffect(() => {
    const queryArgs = {
      page: 0,
      size: 21,
      city,
    };
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const [newEvents, events] = await Promise.all([
          fetchNewEvents({ size: 10, city }),
          fetchEvents(queryArgs),
        ]);

        if (
          newEvents.status === 'uninitialized' ||
          events.status === 'uninitialized'
        ) {
          throw new Error('Failed to fetch events');
        }

        setNewEvents(newEvents.data || []);
        setEvents(events.data || []);
      } catch (error) {
        console.error('Error loading events:', error);
        await getEvents();
      }
      setIsLoading(false);
    };

    getEvents();
  }, [city, fetchNewEvents, fetchEvents]);

  const shownEvents = 16;
  const notTopEvents = events
    ? events
        .filter(item => item.category !== 'TOP_EVENTS')
        .slice(0, shownEvents)
    : [];

  if (isLoading) return <Spinner />;

  return (
    <Main className="flex flex-col lg:gap-16 gap-6 z-10">
      <Hero />
      <>
        {city !== notTopEvents[0]?.location.city && city !== 'Всі міста' && (
          <h2 className="px-[16px] lg:px-[60px] text-2xl lg:text-[40px] font-normal lg:font-medium text-buttonPurple">
            В твоєму місті не має подій, тому рекомендуємо
          </h2>
        )}
        <TopEvents filteredEvents={newEvents} />

        {notTopEvents && (
          <Container className="w-fit">
            <AllEvents events={notTopEvents} title="Усі події" />
          </Container>
        )}
        <ShowAllButton />
      </>
      <Organizers />
      <FAQ />
    </Main>
  );
};

export default Home;
