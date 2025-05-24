import { useEffect, useState } from 'react';

import {
  useLazyGetAllEventsFilteredQuery,
} from '@/redux/events/operations';

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
  const [getTopEventsFn, { isLoading, isFetching }] =
    useLazyGetAllEventsFilteredQuery();
  const [events, setEvents] = useState<Event[]>([]);
  const [topEvents, setTopEvents] = useState<Event[]>([]);

  useScrollToTop();

  useEffect(() => {
    const fetchEvents = async () => {
      const getEvents = async () => {
        const response = await getTopEventsFn({
          page: 0,
          size: 21,
          filter: {},
        });
        setEvents([...(response.data || [])]);

        if (response.status === 'uninitialized') {
          await getEvents();
        }
      };

      const getTopEvents = async () => {
        const topEventsResponse = await getTopEventsFn({
          page: 0,
          size: 10,
          filter: { isPopular: true },
        });

        setTopEvents([...(topEventsResponse.data || [])]);

        if (topEventsResponse.status === 'uninitialized') {
          await getTopEvents();
        }
      };

      getEvents();
      getTopEvents();
    };

    fetchEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shownEvents = 16;
  const notTopEvents = events
    ?.filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);

  if (isLoading || isFetching) return <Spinner />;

  return (
    <Main className="flex flex-col lg:gap-16 gap-0 z-10">
      <Hero />
      <>
        <TopEvents filteredEvents={topEvents} />
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
