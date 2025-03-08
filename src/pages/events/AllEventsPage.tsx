import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLazyGetAllEventsFilteredQuery } from '@/redux/events/operations';
import {
  resetAllFilters,
  setFilteredEventsId,
  setFirstRender,
} from '@/redux/filters/filtersSlice';
import {
  // getFilteredEventsId,
  getFirstRender,
  getSelectedTypes,
  getUserCoordinates,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { useFilter } from '@/hooks/filters/useFilter';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Main } from '@/components/main/Main';
import { GoogleMap } from '@/components/ui/GoogleMap';
import SmallSpinner from '@/components/ui/SmallSpinner';
import Spinner from '@/components/ui/Spinner';

const size = 9;

const AllEventsPage: React.FC = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();

  const firstRender = useAppSelector(getFirstRender);
  const userCoordinates = useAppSelector(getUserCoordinates);
  const selectedTypes = useAppSelector(getSelectedTypes);

  const filter = useAppSelector(state => state.filter);
  const [events, setEvents] = useState<Event[]>([]);
  const [isFullList, setIsFullList] = useState(false);
  const [page, setPage] = useState(0);

  const [filterEvent, { isLoading }] = useLazyGetAllEventsFilteredQuery();

  const { addTypeFilter, addDateFilter, addPriceFilter } = useFilter({
    events,
  });

  const filterEvents = useCallback(async () => {
    const response = await filterEvent({
      page: 0,
      size: size,
      filter: {
        eventTypes: filter?.selectedTypes.filter(
          type => type !== 'ALL_EVENTS' && type !== 'POPULAR'
        ),
        isPopular: filter.selectedTypes.includes('POPULAR'),
        isNearby: filter.selectedTypes.includes('UNDER_HOUSE'),
        latitude: filter.userCoordinates?.latitude,
        longitude: filter.userCoordinates?.longitude,
        isThisWeek: !!filter.selectedDates.includes('На цьому тижні'),
        dayRange: filter?.rangeDatesArray[0]
          ? {
              startDay: filter?.rangeDatesArray[0],
              endDay:
                filter?.rangeDatesArray[filter.rangeDatesArray.length - 1],
            }
          : undefined,
        isToday: !!filter.selectedDates.includes('Сьогодні'),
        isOnTheWeekend: filter.selectedDates.includes('На вихідних'),
        isFree: filter.selectedPrices.includes(0),
        isUnder500: filter.selectedPrices.includes(500),
        priceRange: {
          priceFrom: filter.selectedPrices.includes(1000) ? 500 : undefined,
          priceTo: filter.selectedPrices.includes(1000) ? 1000 : undefined,
        },
      },
    });
    console.log(response);

    setPage(1);
    setEvents(response.data || []);
  }, [filter, filterEvent]);

  console.log('evets', events);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await filterEvent({
        page: page,
        size: size,
        filter: {
          eventTypes: filter?.selectedTypes.filter(
            type => type !== 'ALL_EVENTS' && type !== 'POPULAR'
          ),
          isPopular: filter.selectedTypes.includes('POPULAR'),
          isNearby: filter.selectedTypes.includes('UNDER_HOUSE'),
          latitude: filter.userCoordinates?.latitude,
          longitude: filter.userCoordinates?.longitude,
          isThisWeek: !!filter.selectedDates.includes('На цьому тижні'),
          dayRange: filter?.rangeDatesArray[0]
            ? {
                startDay: filter?.rangeDatesArray[0],
                endDay:
                  filter?.rangeDatesArray[filter.rangeDatesArray.length - 1],
              }
            : undefined,
          isToday: !!filter.selectedDates.includes('Сьогодні'),
          isOnTheWeekend: filter.selectedDates.includes('На вихідних'),
          isFree: filter.selectedPrices.includes(0),
          isUnder500: filter.selectedPrices.includes(500),
          priceRange: {
            priceFrom: filter.selectedPrices.includes(1000) ? 500 : undefined,
            priceTo: filter.selectedPrices.includes(1000) ? 1000 : undefined,
          },
        },
      });

      setPage(prev => prev + 1);
      setEvents(events => [...events, ...(response.data || [])]);

      if ((response?.data?.length || 0) < 9) {
        console.log('Full list');

        setIsFullList(true);
      }
    };
    if (inView && !isLoading) {
      fetchEvents();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const resetFilters = () => {
    dispatch(resetAllFilters());
    filterEvents();
  };

  useEffect(() => {
    if (events && firstRender) {
      dispatch(setFilteredEventsId(events.map(item => item.id)));
      dispatch(setFirstRender(false));
    }
  }, [dispatch, events, firstRender]);

  useScrollToTop();

  console.log(inView, isFullList);

  if (!inView && isLoading) return <Spinner />;

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
        {events && events?.length > 0 ? (
          <div className="flex flex-col gap-[24px]">
            <AllEvents events={events || []} title={false} />
            {userCoordinates && selectedTypes.includes('UNDER_HOUSE') && (
              <GoogleMap events={events || []} userLocation={userCoordinates} />
            )}
            {inView && !isFullList && (
              <div>
                <SmallSpinner />
              </div>
            )}
            <div ref={ref} id="inView"></div>
          </div>
        ) : (
          isLoading && (
            <span className="text-[64px] font-oswald text-buttonPurple">
              Нічого не знайдено
            </span>
          )
        )}
      </div>
    </Main>
  );
};

export default AllEventsPage;
