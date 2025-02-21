import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '@/redux/auth/operations';
import { selectUserEvents } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

import Spinner from '../ui/Spinner';
import EventRow from './EventRow';
import TableHead from './TableHead';

const TableEvent = () => {
  const [idPopUp, setIdPopUp] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const events = useAppSelector(selectUserEvents);
  const dispatch = useAppDispatch();
  let isRefersh = false;

  const handleOpenPopUp = (id?: string) => {
    setIdPopUp(id);
  };

  const handleClickTable = (target: HTMLElement) => {
    if (target.dataset.name === 'kebab') {
      return;
    }

    handleOpenPopUp(undefined);
  };

  const handleRefreshEvents = async () => {
    setIsLoading(true);
    if (!isRefersh) {
      isRefersh = true;
      dispatch(getUser()).then(() => (isRefersh = false));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleRefreshEvents();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!events || !events.length) {
    return (
      <>
        <h2 className="text-[48px] font-oswald text-buttonPurple">
          Ваш список подій поки що порожній.
        </h2>
        <p className="text-[36px] font-oswald text-buttonPurple">
          Зробіть перший крок до успіху — створіть подію!
          <Link to="/create_event" className='hover:text-borderColor italic'>[Створити подію]</Link>
        </p>
      </>
    );
  }

  return (
    <table
      onClick={e => handleClickTable(e.target as HTMLElement)}
      className="w-full border-collapse"
    >
      <TableHead refresh={handleRefreshEvents} />
      <tbody className="">
        {events?.map((event, index) => (
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
  );
};

export default TableEvent;
