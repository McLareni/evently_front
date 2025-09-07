import React from 'react';

import { useGetTicketsQuery } from '@/redux/auth/authApi';
import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import MobileTicket from '@/components/myTickets/MobileTicket';
import WebTicket from '@/components/myTickets/WebTicket';
import Spinner from '@/components/ui/Spinner';

const TICKETS = [
  {
    id: '123456',
    status: 'Оплачено',
    event: {
      title: 'Концерт гурту "Океан Ельзи"',
      price: '500 грн',
      date: { day: '2025-09-10' },
      images: [
        {
          url: 'https://cdn.ain.ua/ua/2020/04/61688202_2027896620654698_6628358590522458112_o-1-808x538.jpg',
        },
      ],
      location: {
        city: 'Київ',
        street: 'вул. Хрещатик, 22',
      },
    },
  },
  {
    id: '1223465865',
    status: 'Оплачено',
    event: {
      title: 'Концерт гурту "Океан Ельзи"',
      price: '500 грн',
      date: { day: '2025-09-10' },
      images: [
        {
          url: 'https://cdn.ain.ua/ua/2020/04/61688202_2027896620654698_6628358590522458112_o-1-808x538.jpg',
        },
      ],
      location: {
        city: 'Київ',
        street: 'вул. Хрещатик, 22',
      },
    },
  },
];

const MyTicket: React.FC = () => {
  const { id } = useAppSelector(selectUser);
  const { data: tickets, isLoading } = useGetTicketsQuery(id);
  const { isMobile } = useMediaVariables();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="flex flex-col gap-6">
      {TICKETS?.map(ticket => (
        <li key={ticket.id}>
          {isMobile ? (
            <MobileTicket ticket={ticket} />
          ) : (
            <WebTicket ticket={ticket} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MyTicket;
