import { useEffect, useState } from 'react';

import { changeEventStatus, fetchAdminEvent } from '@/utils/adminEvents';

import { AdminEventsList } from '@/components/admin/Events/AdminEventsList';
import ModalDecision from '@/components/admin/Events/ModalDecision';
import StatusBar from '@/components/admin/Events/StatusBar';
import ModalAdmin from '@/components/admin/ModalAdmin';
import Navigation from '@/components/admin/Navigation';
import { Modal } from '@/components/ui';

export type FilterStatus = 'PENDING' | 'APPROVED' | 'CANCELLED' | '';

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[] | null>();
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<Event>();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('');
  const [action, setAction] = useState<'APPROVED' | 'CANCELLED' | ''>('');

  useEffect(() => {
    const getEvents = async () => {
      setEvents(await fetchAdminEvent());
    };

    getEvents();
  }, []);

  const handleChangePage = (direction: 'up' | 'down') => {
    setPage(prevPage => {
      if (direction === 'up') {
        return prevPage >= Math.ceil((sortedEvents?.length || 0) / 9)
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

  const openModal = (
    event: Event,
    target: HTMLElement,
    actionStatus: 'APPROVED' | 'CANCELLED' | ''
  ) => {
    if (event) {
      setCurrEvent(event);

      if (target) {
        if (target?.tagName !== 'BUTTON') {
          setModalIsOpen(true);
        } else if (target.tagName === 'BUTTON') {
          console.log(actionStatus);
          if (actionStatus) {
            setAction(actionStatus);
          }
          setConfirmationModal(true);
        }
      }
    }
  };

  const changeStatusEvent = async () => {
    const response = await changeEventStatus(currEvent?.id || '', action);

    if (response.status === 200) {
      setEvents(await fetchAdminEvent());
      setModalIsOpen(false);
      setConfirmationModal(false);
    }
  };

  const handleChangeFilterStatus = (status: FilterStatus) => {
    setPage(1);
    setFilterStatus(prev => (prev === status ? '' : status));
  };

  let sortedEvents = filterStatus
    ? events?.filter(event => event.eventStatus === filterStatus)
    : events;

  const totalEvents = sortedEvents?.length;
  const startCountPage = sortedEvents?.length === 0 ? 0 : 9 * (page - 1) + 1;
  const endCountPage =
    page * 9 > (sortedEvents?.length || 0) ? sortedEvents?.length : page * 9;

  const countStatusEvents = {
    CANCELLED: 0,
    PENDING: 0,
    APPROVED: 0,
  };

  events?.forEach(event =>
    event.eventStatus === 'APPROVED'
      ? countStatusEvents.APPROVED++
      : event.eventStatus === 'CANCELLED'
        ? countStatusEvents.CANCELLED++
        : countStatusEvents.PENDING++
  );

  const handleOpenModal = (status: 'APPROVED' | 'CANCELLED' | '') => {
    setConfirmationModal(true);
    setAction(status);
  };

  return (
    <main className="relative pb-10 h-full">
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalDecision event={currEvent} openModal={handleOpenModal} />
      </Modal>
      <StatusBar
        activeStatus={filterStatus}
        changeStatus={handleChangeFilterStatus}
        countStatusEvent={countStatusEvents}
      />
      <AdminEventsList
        events={sortedEvents?.slice(0 + (page - 1) * 9, 9 * page) || []}
        setEvent={openModal}
      />
      <div className="absolute bottom-0 right-6 flex items-center">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px] text-xs leading-5">
          {startCountPage}-{endCountPage} з {totalEvents}
        </p>
        <p className="mr-4 text-xs leading-5">Кількість користувачів</p>
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
