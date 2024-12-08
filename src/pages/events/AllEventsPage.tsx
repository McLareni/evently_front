import { useEffect, useState } from 'react';

import {
  resetAllFilters,
  setFilteredEventsId,
  setFirstRender,
} from '@/redux/filters/filtersSlice';
import { getFilteredEventsId, getFirstRender } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { filterByPrice } from '@/helpers/filterByPrice';
import { useFilter } from '@/hooks/filters/useFilter';
import { useLazyGetAllEventsQueryWithTrigger } from '@/hooks/query/useLazyGetAllEventsQueryWithTrigger';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Main } from '@/components/main/Main';
import Spinner from '@/components/ui/Spinner';

const AllEventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const filteredEventsId = useAppSelector(getFilteredEventsId);
  const firstRender = useAppSelector(getFirstRender);

  const { events, isLoading } = useLazyGetAllEventsQueryWithTrigger();

  const {
    addTypeFilter,
    addDateFilter,
    addPriceFilter,
    selectedPrices,
    filteredEventsByDate,
    filteredEventsByRange,
  } = useFilter({ events });

  const filteredEventsByDateOrRange = () => {
    if (filteredEventsByDate.length > 0) return filteredEventsByDate;
    if (filteredEventsByRange.length > 0) return filteredEventsByRange;
    return [];
  };

  const filteredEventsByDateOrRangeResult = filteredEventsByDateOrRange();

  const filterEvents = () => {
    const filteredEvents = filterByPrice({
      selectedPrices,
      filteredEventsByDateOrRangeResult,
    });
    dispatch(setFilteredEventsId(filteredEvents.map(item => item.id)));
  };

  const resetFilters = () => {
    dispatch(resetAllFilters());
  };

  useEffect(() => {
    if (events && firstRender) {
      dispatch(setFilteredEventsId(events.map(item => item.id)));
      dispatch(setFirstRender(false));
    }
  }, [dispatch, events, firstRender]);

  useEffect(() => {
    if (events && events.length > 0) {
      setFilteredEvents(
        events.filter(item => filteredEventsId.includes(item.id))
      );
      setEventsLoaded(true);
    }
  }, [events, filteredEventsId]);

  useScrollToTop();

  if (isLoading) return <Spinner />;

  return (
    <Main className="flex flex-col gap-16 pb-16">
      <div className="flex gap-[24px]">
        <FilterEvents
          filterEvents={filterEvents}
          addTypeFilter={addTypeFilter}
          resetFilters={resetFilters}
          addDateFilter={addDateFilter}
          addPriceFilter={addPriceFilter}
        />
        {filteredEvents.length > 0 ? (
          <AllEvents events={filteredEvents} title={false} />
        ) : (
          eventsLoaded && <span>Нічого не знайдено</span>
        )}
      </div>
    </Main>
  );
};

export default AllEventsPage;
