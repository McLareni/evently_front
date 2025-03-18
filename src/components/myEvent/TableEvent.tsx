import { useState } from 'react';
import { Link } from 'react-router-dom';

import { selectUser } from '@/redux/auth/selectors';
import { useGetAllMyEventsQuery } from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

import Spinner from '../ui/Spinner';
import EventRow from './EventRow';
import TableHead from './TableHead';

const TableEvent = () => {
  const [idPopUp, setIdPopUp] = useState<string | undefined>(undefined);
  const { id } = useAppSelector(selectUser);
  const { data: events, isFetching, refetch } = useGetAllMyEventsQuery(id);

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
    refetch();
  };

  if (isFetching) {
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
  );
};

export default TableEvent;
