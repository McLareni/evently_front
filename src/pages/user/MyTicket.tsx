import React from 'react';

import { useGetTicketsQuery } from '@/redux/auth/authApi';
import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import MobileTicket from '@/components/myTickets/MobileTicket';
import WebTicket from '@/components/myTickets/WebTicket';
import Spinner from '@/components/ui/Spinner';

const MyTicket: React.FC = () => {
  const { id } = useAppSelector(selectUser);
  const { data: tickets, isLoading } = useGetTicketsQuery(id);
  const { isMobile } = useMediaVariables();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="flex flex-col gap-6">
      {tickets?.map(ticket => (
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
