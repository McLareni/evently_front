import { useEffect, useState } from 'react';

import { getUser } from '@/redux/auth/operations';
import { selectUserEvents } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

import EventRow from './EventRow';
import TableHead from './TableHead';

const TableEvent = () => {
  const [idPopUp, setIdPopUp] = useState<string | undefined>(undefined);
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
    if (!isRefersh) {
      isRefersh = true;
      dispatch(getUser()).then(() => (isRefersh = false));
    }
  };

  useEffect(() => {
    handleRefreshEvents();
  }, []);

  console.log(events);

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
