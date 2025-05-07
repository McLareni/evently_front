import { useState } from 'react';

import {
  useAcceptEditEventMutation,
  useChangeEventStatusMutation,
  useGetAdminEventsQuery,
  useGetCountStatusEventsQuery,
} from '@/redux/admin/eventApi';

import { AdminEventsList } from '@/components/admin/Events/AdminEventsList';
import ModalDecision from '@/components/admin/Events/ModalDecision';
import StatusBar from '@/components/admin/Events/StatusBar';
import ModalAdmin from '@/components/admin/ModalAdmin';
import Navigation from '@/components/admin/Navigation';
import { Modal } from '@/components/ui';
import Spinner from '@/components/ui/Spinner';

export type FilterStatus = 'PENDING' | 'APPROVED' | 'CANCELLED' | '';

const AdminEvents = () => {
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<Event>();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('');
  const [action, setAction] = useState<'APPROVED' | 'CANCELLED'>('APPROVED');
  const [requestId, setRequestId] = useState<string>('');

  const { data, isFetching: fetchingEvents } = useGetAdminEventsQuery({
    page,
    status: filterStatus,
  });
  const { data: countStatusEvents, isFetching: fetchingCount } =
    useGetCountStatusEventsQuery();
  const [changeStatusEventFn] = useChangeEventStatusMutation();
  const [acceptEditEvent] = useAcceptEditEventMutation();

  const { content: events, page: pageInfo } = data || { content: [], page: {} };

  const handleChangePage = (direction: 'up' | 'down') => {
    setPage(prevPage => {
      if (direction === 'up') {
        return prevPage >= Math.ceil((totalEvents || 0) / 9)
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
    actionStatus: 'APPROVED' | 'CANCELLED' | '',
    requestId?: string
  ) => {
    if (event) {
      setCurrEvent(event);
      setRequestId(requestId || '');

      if (target) {
        if (target?.tagName !== 'BUTTON') {
          setModalIsOpen(true);
        } else if (target.tagName === 'BUTTON') {
          if (actionStatus) {
            setAction(actionStatus);
          }
          setConfirmationModal(true);
        }
      }
    }
  };

  const changeStatusEvent = async () => {
    if (currEvent?.hasUpdateRequest) {
      await acceptEditEvent({
        id: currEvent?.id || '',
        requestId,
      });
    }

    if (!currEvent?.hasCancelRequest && !currEvent?.hasUpdateRequest) {
      await changeStatusEventFn({
        id: currEvent?.id || '',
        action,
      });
    }

    setModalIsOpen(false);
    setConfirmationModal(false);
  };

  const handleChangeFilterStatus = (status: FilterStatus) => {
    setPage(1);
    setFilterStatus(prev => (prev === status ? '' : status));
  };

  const totalEvents = pageInfo.totalElements;
  const startCountPage = totalEvents === 0 ? 0 : 9 * (page - 1) + 1;
  const endCountPage = page * 9 > (totalEvents || 0) ? totalEvents : page * 9;

  const handleOpenModal = (status: 'APPROVED' | 'CANCELLED', requestId?: string) => {
    setConfirmationModal(true);
    setAction(status);
    setRequestId(requestId || '');
  };

  if (fetchingEvents || fetchingCount) {
    return <Spinner />;
  }

  return (
    <main className="relative pb-10 px-2 h-full">
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalDecision event={currEvent} openModal={handleOpenModal} />
      </Modal>
      <StatusBar
        activeStatus={filterStatus}
        changeStatus={handleChangeFilterStatus}
        countStatusEvent={
          countStatusEvents as {
            CANCELLED: number;
            PENDING: number;
            APPROVED: number;
          }
        }
      />
      <AdminEventsList events={events} setEvent={openModal} />
      <div className="absolute bottom-0 right-6 flex items-center">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px] text-xs leading-5">
          {startCountPage}-{endCountPage} з {totalEvents}
        </p>
        <p className="mr-4 text-xs leading-5">Кількість подій</p>
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
