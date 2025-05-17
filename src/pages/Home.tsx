import { useEffect, useState } from 'react';

import {
  useLazyGetAllEventsQuery,
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
  const [getEvents, { isFetching }] = useLazyGetAllEventsQuery();
  const [events, setEvents] = useState<Event[]>([]);

  useScrollToTop();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents({ page: 0, size: 21 });

      setEvents(prevEvents => [...prevEvents, ...(response.data || [])]);

      if (response.status === 'uninitialized') {
        await fetchEvents();
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shownEvents = 16;
  const notTopEvents = events
    ?.filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);
  const topEvents = events?.filter(event => event.category === 'TOP_EVENTS');

  if (isFetching) return <Spinner />;

  return (
    <Main className="flex flex-col gap-16 z-10">
      <Hero/>
      <>
        <TopEvents filteredEvents={topEvents} />
        {notTopEvents && (
          <Container>
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
