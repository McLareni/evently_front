import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { selectUser } from '@/redux/auth/selectors';
import { useLazyGetAllMyEventsQuery } from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

import SmallSpinner from '../ui/SmallSpinner';
import Spinner from '../ui/Spinner';
import EventRow from './EventRow';
import TableHead from './TableHead';

const TableEvent = () => {
  const [idPopUp, setIdPopUp] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);
  const [isFullList, setIsFullList] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const { id } = useAppSelector(selectUser);
  const [getEvents, { isFetching, isLoading }] = useLazyGetAllMyEventsQuery();

  const handleOpenPopUp = (id?: string) => {
    setIdPopUp(id);
  };

  const handleClickTable = (target: HTMLElement) => {
    if (target.dataset.name === 'kebab') {
      return;
    }

    handleOpenPopUp(undefined);
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

    setEvents(response.data || []);
  };

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

  const handleRefreshEvents = async () => {
    filterEvents();
  };

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  if (!events || !events.length) {
    return (
      <>
        <h2 className="text-[48px] leading-normal font-oswald text-buttonPurple">
          Ваш список подій поки що порожній.
        </h2>
        <p className="text-[36px] font-oswald text-buttonPurple">
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
              />
            </tr>
          ))}
        </tbody>
      </table>
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
