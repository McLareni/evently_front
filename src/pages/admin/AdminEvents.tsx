import { useEffect, useState } from 'react';

import { getAllEventsLoader } from '@/loaders/getAllEventsLoader';

import { AdminEventsList } from '@/components/admin/Events/AdminEventsList';
import ModalDecision from '@/components/admin/Events/ModalDecision';
import StatusBar from '@/components/admin/Events/StatusBar';
import Navigation from '@/components/admin/Navigation';
import { Modal } from '@/components/ui';

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[] | null>();
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<Event>();

  useEffect(() => {
    const getEvents = async () => {
      setEvents(await getAllEventsLoader());
    };

    getEvents();
  }, []);

  const handleChangePage = (direction: 'up' | 'down') => {
    setPage(prevPage => {
      if (direction === 'up') {
        return prevPage >= Math.ceil((events?.length || 0) / 9)
          ? prevPage
          : prevPage + 1;
      } else {
        return prevPage === 1 ? 1 : prevPage - 1;
      }
    });
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const openModal = (event?: Event) => {
    if (event) {
      setCurrEvent(event);
      setModalIsOpen(true);
    }
  };

  return (
    <main className="relative pb-10">
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalDecision event={currEvent} />
      </Modal>
      <StatusBar />
      <AdminEventsList
        events={events?.slice(0 + (page - 1) * 9, 9 * page) || []}
        setEvent={openModal}
      />
      <div className="absolute bottom-0 right-6 flex items-center">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px]">
          {9 * (page - 1) + 1}-{page * 9 > (events?.length || 0) ? events?.length : page * 9}{' '}
          з {events?.length}
        </p>
        <p className="mr-4">Кількість користувачів</p>
        <Navigation page={page} changePage={handleChangePage} />
      </div>
    </main>
  );
};

export default AdminEvents;
