import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLazyGetTicketsQuery } from '@/redux/auth/authApi';
import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import MobileTicket from '@/components/myTickets/MobileTicket';
import WebTicket from '@/components/myTickets/WebTicket';
import SmallSpinner from '@/components/ui/SmallSpinner';
import Spinner from '@/components/ui/Spinner';

const MyTicket: React.FC = () => {
  const { id } = useAppSelector(selectUser);
  const [getTickets, { isLoading, isFetching }] = useLazyGetTicketsQuery();
  const { isMobile } = useMediaVariables();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isFullList, setIsFullList] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);

  useEffect(() => {
    filterEvents();
  }, []);

  const filterEventsFn = async (pageN: number) => {
    return await getTickets({
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

    if ((response?.data?.length || 0) < 5) {
      setIsFullList(true);
    }

    setTickets(response.data || []);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await filterEventsFn(page);

      setPage(prev => prev + 1);
      setTickets(prevEvents => [...prevEvents, ...(response.data || [])]);

      if ((response?.data?.length || 0) < 5) {
        setIsFullList(true);
      }
    };
    if (inView && !isLoading && !isFullList && !isFetching) {
      fetchEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
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
      {inView && !isFullList && (
        <div className="mt-2">
          <SmallSpinner />
        </div>
      )}
      <div ref={ref} id="inView"></div>
    </>
  );
};

export default MyTicket;
