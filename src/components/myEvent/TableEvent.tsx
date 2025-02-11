import { useState } from 'react';

import { getUser } from '@/redux/auth/operations';
import { selectUserEvents } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

import EventRow from './EventRow';
import TableHead from './TableHead';

// const events = [
//   {
//     creationDate: '2024-10-20T10:00:00',
//     date: {
//       day: '2025-11-06',
//       time: '17:00',
//       endTime: null,
//     },
//     eventFormat: 'OFFLINE',
//     eventStatus: 'APPROVED',
//     eventUrl:
//       'https://rendereventapp3.onrender.com/api/v1/swagger-ui/index.html#/Events%20Controller/getAllApprovedEvents',
//     id: '671e833c56827a52cc26765f',
//     images: [
//       {
//         creationDate: null,
//         id: '6793adef4f9e0c1b87cabd68',
//         main: true,
//         photoInBytes: 'byteCode',
//       },
//     ],
//     location: {
//       city: 'Київ',
//       street: 'вул. Володимирська, 100',
//       venue: null,
//       latitude: '50.460291',
//       longitude: '30.488216',
//     },
//     numberOfTickets: 10,
//     availableTickets: 3,
//     price: 900,
//     rating: 4.5,
//     tickets: 10000,
//     title: 'Стендап на даху',
//     type: 'Stand-up',
//     unlimitedTickets: null,
//   },
//   {
//     creationDate: '2024-10-20T10:00:00',
//     date: {
//       day: '2025-11-06',
//       time: '17:00',
//       endTime: null,
//     },
//     eventFormat: 'ONLINE',
//     eventStatus: 'CANCELLED',
//     eventUrl:
//       'https://rendereventapp3.onrender.com/api/v1/swagger-ui/index.htmltapp3.onrender.com/api/v1/swagger-ui/index.html',
//     id: '671e833c568765f',
//     images: [
//       {
//         creationDate: null,
//         id: '6793adef4f9e0c1b87cabd68',
//         main: true,
//         photoInBytes: 'byteCode',
//       },
//     ],
//     location: {
//       city: 'Київ',
//       street: 'вул. Володимирська, 100',
//       venue: null,
//       latitude: '50.460291',
//       longitude: '30.488216',
//     },
//     numberOfTickets: 10,
//     availableTickets: 3,
//     price: 900,
//     rating: 4.5,
//     tickets: 10000,
//     title: 'Практикум від хаосу до системного управління',
//     type: 'Stand-up',
//     unlimitedTickets: null,
//   },
// ];

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
