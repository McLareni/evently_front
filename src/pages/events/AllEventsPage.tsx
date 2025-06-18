import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useInView } from 'react-intersection-observer';

import { useLazyGetAllEventsFilteredQuery } from '@/redux/events/operations';
import {
  resetAllFilters,
  setFilteredEventsId,
  setFirstRender,
} from '@/redux/filters/filtersSlice';
import { getFirstRender } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { useFilter } from '@/hooks/filters/useFilter';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Main } from '@/components/main/Main';
import { AuthMobileModal } from '@/components/ui/AuthMobileModal';
import { GoogleMap } from '@/components/ui/GoogleMap';
import SmallSpinner from '@/components/ui/SmallSpinner';
import Spinner from '@/components/ui/Spinner';

const size = 9;

const AllEventsPage: React.FC = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();

  const firstRender = useAppSelector(getFirstRender);

  const filter = useAppSelector(state => state.filter);
  const [events, setEvents] = useState<Event[]>([]);
  const [isFullList, setIsFullList] = useState(false);
  const [page, setPage] = useState(0);
  const [mapIsHidden, setMapIsHidden] = useState(true);
  const [filterShown, setFilterShown] = useState(false);

  const toggleFilterShown = () => {
    setFilterShown(!filterShown);
  };

  const [filterEvent, { isLoading, isFetching }] =
    useLazyGetAllEventsFilteredQuery();

  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    suppressLocationOnMount: true,
  });
  const { addTypeFilter, addDateFilter, addPriceFilter } = useFilter({
    events,
  });

  const width = useScreenWidth();

  const filterEventsFn = async (pageN: number) => {
    return await filterEvent({
      page: pageN,
      size: size,
      filter: {
        eventTypes: filter?.selectedTypes.filter(
          type =>
            type !== 'ALL_EVENTS' &&
            type !== 'POPULAR' &&
            type !== 'UNDER_HOUSE'
        ),
        isPopular: filter.selectedTypes.includes('POPULAR'),
        isNearby: filter.selectedTypes.includes('UNDER_HOUSE') && !!coords,
        latitude:
          filter.selectedTypes.includes('UNDER_HOUSE') && coords?.latitude
            ? 50.43749
            : undefined,
        longitude:
          filter.selectedTypes.includes('UNDER_HOUSE') && coords?.longitude
            ? 30.514977
            : undefined,
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
  };

  const filterEvents = async () => {
    setIsFullList(false);

    if (filter.selectedTypes.includes('UNDER_HOUSE') && !coords) {
      getPosition();
      return;
    }
    const response = await filterEventsFn(0);
    setPage(1);

    if (response.status === 'uninitialized') {
      filterEvents();
    }

    setEvents(response.data || []);

    if (filter.selectedTypes.includes('UNDER_HOUSE') && !!coords) {
      setMapIsHidden(false);
    } else {
      setMapIsHidden(true);
    }
  };

  useEffect(() => {
    console.log(filter.selectedTypes);

    if (filter.selectedTypes.length > 1) {
      return;
    }

    filterEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  useEffect(() => {
    if (filter.selectedTypes.includes('UNDER_HOUSE') && !coords) {
      getPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await filterEventsFn(page);

      setPage(prev => prev + 1);
      setEvents(prevEvents => [...prevEvents, ...(response.data || [])]);

      if ((response?.data?.length || 0) < 9) {
        console.log('Full list');

        setIsFullList(true);
      }
    };
    if (inView && !isLoading && !isFullList && !isFetching) {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const resetFilters = async () => {
    setMapIsHidden(true);
    dispatch(resetAllFilters());
    const response = await filterEvent({
      page: 0,
      size: size,
      filter: {},
    });
    setEvents(response.data || []);
  };

  useEffect(() => {
    if (events && firstRender) {
      dispatch(setFilteredEventsId(events.map(item => item.id)));
      dispatch(setFirstRender(false));
    }
  }, [dispatch, events, firstRender]);

  useScrollToTop();

  if (isLoading) return <Spinner />;

  return (
    <Main className="flex flex-col gap-16 pb-16">
      <div className="lg:flex gap-[24px]">
        {width > 1024 && (
          <FilterEvents
            filterEvents={filterEvents}
            addTypeFilter={addTypeFilter}
            resetFilters={resetFilters}
            addDateFilter={addDateFilter}
            addPriceFilter={addPriceFilter}
            toggleFilterShown={toggleFilterShown}
          />
        )}
        {width < 1024 && (
          <div className="relative flex items-center justify-between px-[16px] py-[12px]">
            <p className="text-[28px] font-oswald">Усі події</p>
            <button
              onClick={toggleFilterShown}
              className={`w-[48px] h-[48px] bg-lightPurple rounded-[20px]
                  flex justify-center items-center focus:outline-none`}
            >
              <GiSettingsKnobs size={24} />
            </button>
            <AuthMobileModal
              hiddenCross={true}
              isOpen={filterShown}
              paddingTop={144}
            >
              <FilterEvents
                filterEvents={filterEvents}
                addTypeFilter={addTypeFilter}
                resetFilters={resetFilters}
                addDateFilter={addDateFilter}
                addPriceFilter={addPriceFilter}
                toggleFilterShown={toggleFilterShown}
                onClose={toggleFilterShown}
              />
            </AuthMobileModal>
          </div>
        )}
        <div className="mx-4 lg:mx-0 lg:w-full">
          {events && events?.length > 0 ? (
            <div className="flex flex-col">
              {!mapIsHidden && (
                <div className="mb-8 pr-16 lg:flex lg:justify-center">
                  <GoogleMap
                    events={events || []}
                    userLocation={{ latitude: 50.43749, longitude: 30.514977 }}
                  />
                </div>
              )}
              <AllEvents events={events || []} title={false} />
              {inView && !isFullList && (
                <div>
                  <SmallSpinner />
                </div>
              )}
              <div ref={ref} id="inView"></div>
            </div>
          ) : (
            <span className="block text-[32px] lg:text-[64px] text-center font-oswald text-buttonPurple">
              Нічого не знайдено
            </span>
          )}
        </div>
      </div>
    </Main>
  );
};

export default AllEventsPage;
