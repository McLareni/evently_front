import { useLazyGetAllEventsQueryWithTrigger } from '@/hooks/query/useLazyGetAllEventsQueryWithTrigger';

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
  const { events, isLoading } = useLazyGetAllEventsQueryWithTrigger();

  const shownEvents = 16;
  const notTopEvents = events
    ?.filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);
  const topEvents = events?.filter(event => event.category === 'TOP_EVENTS');

  if (isLoading) return <Spinner />;

  return (
    <Main className="flex flex-col gap-16 z-10">
      <Hero />
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
