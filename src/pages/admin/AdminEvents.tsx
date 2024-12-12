import { useEffect, useState } from 'react';

import { getAllEventsLoader } from '@/loaders/getAllEventsLoader';

import { AdminEventsList } from '@/components/admin/Events/AdminEventsList';
import ModalDecision from '@/components/admin/Events/ModalDecision';
import StatusBar from '@/components/admin/Events/StatusBar';
import ModalAdmin from '@/components/admin/ModalAdmin';
import Navigation from '@/components/admin/Navigation';
import { Modal } from '@/components/ui';

export type FilterStatus = 'expect' | 'approved' | 'rejected' | '';

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[] | null>();
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<Event>();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('');

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

  const openModal = (event?: Event, target?: HTMLElement) => {
    if (event) {
      setCurrEvent(event);
      console.log(target?.tagName);

      if (target?.tagName !== 'BUTTON') {
        setModalIsOpen(true);
      } else if (target.tagName === 'BUTTON') {
        setConfirmationModal(true);
      }
    }
  };

  const changeStatusEvent = () => {
    console.log(currEvent);
  };

  const handleChangeFilterStatus = (status: FilterStatus) => {
    setFilterStatus(prev => (prev === status ? '' : status));
  };

  return (
    <main className="relative pb-10">
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalDecision
          event={currEvent}
          openModal={() => setConfirmationModal(true)}
        />
      </Modal>
      <StatusBar
        activeStatus={filterStatus}
        changeStatus={handleChangeFilterStatus}
      />
      <AdminEventsList
        changeStatus={changeStatusEvent}
        events={events?.slice(0 + (page - 1) * 9, 9 * page) || []}
        setEvent={openModal}
      />
      <div className="absolute bottom-0 right-6 flex items-center">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px]">
          {9 * (page - 1) + 1}-
          {page * 9 > (events?.length || 0) ? events?.length : page * 9} з{' '}
          {events?.length}
        </p>
        <p className="mr-4">Кількість користувачів</p>
        <Navigation page={page} changePage={handleChangePage} />
      </div>
      <ModalAdmin
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        clickYes={changeStatusEvent}
        text="Ви точно хочете змінити статус цієї події?"
      />
    </main>
  );
};

export default AdminEvents;
