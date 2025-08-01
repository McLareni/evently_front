import {
  useGetAllEventsFilteredQuery,
  useGetNewEventsQuery,
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
  const {
    data: newEvent,
    isLoading: newEventIsLoading,
    isFetching: newEventIsFetching,
  } = useGetNewEventsQuery(10);
  const {
    isLoading,
    isFetching,
    data: events,
  } = useGetAllEventsFilteredQuery({
    page: 0,
    size: 21,
    filter: {},
  });

  useScrollToTop();

  const shownEvents = 16;
  const notTopEvents = events
    ?.filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);

  const loadingList = [
    isLoading,
    isFetching,
    newEventIsFetching,
    newEventIsLoading,
  ];

  if (loadingList.some(Boolean)) return <Spinner />;

  return (
    <Main className="flex flex-col lg:gap-16 gap-6 z-10">
      <Hero />
      <>
        <TopEvents filteredEvents={newEvent} />
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
