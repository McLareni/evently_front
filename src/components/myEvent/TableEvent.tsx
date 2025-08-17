import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { selectUser } from '@/redux/auth/selectors';
import {
  useDeleteMyEventMutation,
  useLazyGetAllMyEventsQuery,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';

import SmallSpinner from '../ui/SmallSpinner';
import Spinner from '../ui/Spinner';
import EventRow from './EventRow';
import MobileList from './MobileList';
import TableHead from './TableHead';

const TableEvent = () => {
  const [idPopUp, setIdPopUp] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);
  const [isFullList, setIsFullList] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const { id } = useAppSelector(selectUser);
  const [getEvents, { isFetching, isLoading }] = useLazyGetAllMyEventsQuery();
  const [deleteMyEvent, { isLoading: isLoadingDeleteEvent }] =
    useDeleteMyEventMutation();
  const { isDesktop } = useMediaVariables();

  const handleOpenPopUp = (id?: string) => {
    setIdPopUp(id);
  };

  const handleClickTable = (target: HTMLElement) => {
    if (target.dataset.name === 'kebab') {
      return;
    }

    handleOpenPopUp(undefined);
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteMyEvent({ idEvent: id });
    console.log(events, id);

    setEvents(prev => prev.filter(event => event.id !== id));
  };

  useEffect(() => {
    filterEvents();
  }, []);

  const filterEventsFn = async (pageN: number) => {
    return await getEvents({
      id,
      page: pageN,
    });
  };

  const filterEvents = async () => {
    setIsFullList(false);

    const response = await filterEventsFn(0);
    setPage(1);

    if (response.status === 'uninitialized') {
      filterEvents();
    }

    console.log(response);

    if ((response?.data?.length || 0) < 5) {
      setIsFullList(true);
    }

    setEvents(response.data || []);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await filterEventsFn(page);

      setPage(prev => prev + 1);
      setEvents(prevEvents => [...prevEvents, ...(response.data || [])]);

      if ((response?.data?.length || 0) < 5) {
        setIsFullList(true);
      }
    };
    if (inView && !isLoading && !isFullList && !isFetching) {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleRefreshEvents = async () => {
    filterEvents();
  };

  if (isLoading || isLoadingDeleteEvent) {
    return <Spinner />;
  }

  if (!events || !events.length) {
    return (
      <>
        <h2 className="lg:text-[48px] text-[28px] leading-normal font-oswald text-buttonPurple">
          Ваш список подій поки що порожній.
        </h2>
        <p className="lg:text-[36px] text-[24px] font-oswald text-buttonPurple">
          Зробіть перший крок до успіху — створіть подію!
          <Link to="/create_event" className="hover:text-borderColor italic">
            [Створити подію]
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      {isDesktop ? (
        <table
          onClick={e => handleClickTable(e.target as HTMLElement)}
          className="w-full border-collapse"
        >
          <TableHead refresh={handleRefreshEvents} />
          <tbody className="">
            {events.map((event, index) => (
              <tr
                key={event.id}
                className={clsx(
                  'h-[100px] items-end relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full',
                  { 'after:bg-buttonPurple': index !== events.length - 1 }
                )}
              >
                <EventRow
                  event={event}
                  popUpIsShow={event.id === idPopUp}
                  openPopUp={handleOpenPopUp}
                  deleteEvent={handleDeleteEvent}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <MobileList
          events={events}
          openPopUp={handleOpenPopUp}
          popUpId={idPopUp}
          deleteEvent={handleDeleteEvent}
          clickOutside={handleClickTable}
        />
      )}
      {inView && !isFullList && (
        <div>
          <SmallSpinner />
        </div>
      )}
      <div ref={ref} id="inView"></div>
    </>
  );
};

export default TableEvent;
