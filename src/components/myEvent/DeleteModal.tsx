import React from 'react';

import { Modal, SharedBtn } from '../ui';

interface IProps {
  deletePopUp: boolean;
  // eslint-disable-next-line no-unused-vars
  setDeletePopUp: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  deleteEvent: (id: string) => void;
  event: Event;
  // eslint-disable-next-line no-unused-vars
  setConfirmationDeletePopUp: (value: boolean) => void;
}

const DeleteModal: React.FC<IProps> = ({
  deleteEvent,
  setDeletePopUp,
  deletePopUp,
  event,
  setConfirmationDeletePopUp,
}) => {
  return (
    <Modal
      isOpen={deletePopUp}
      hiddenCross
      onClose={() => setDeletePopUp(false)}
    >
      <div className="min-w-[340px] py-6 px-2.5 lg:px-[57px] text-center border border-buttonPurple rounded-[20px]">
        <h2 className="text-base lg:text-xl font-bold font-lato mb-4">
          Скасувати подію?
        </h2>
        <h3 className="text-sm lg:text-xl font-normal font-lato mb-6">
          {event.soldTickets ? (
            <>
              Це може вплинути на довіру <br /> користувачів. Усі кошти з
              продажу <br />
              квитків буде повернено. Ти впевнений?
            </>
          ) : (
            <>
              Це може вплинути на довіру <br /> користувачів, а також подія буде{' '}
              <br /> <b>видалена назавжди.</b> Ти впевнений?
            </>
          )}
        </h3>
        <div className="flex justify-around">
          <SharedBtn
            type="button"
            className="w-[148px] lg:w-[120px] h-[36px] lg:h-[38px] text-base lg:text-xl !leading-[0px]"
            primary
            onClick={async () => {
              if (event.soldTickets === '0' || event.soldTickets === null) {
                await deleteEvent(event.id);
                setDeletePopUp(false);
              } else {
                setConfirmationDeletePopUp(true);
              }
            }}
          >
            Так
          </SharedBtn>
          <SharedBtn
            type="button"
            className="w-[148px] lg:w-[120px] h-[36px] lg:h-[38px] text-base lg:text-xl !leading-[0px]"
            secondary
            onClick={() => {
              setDeletePopUp(false);
            }}
          >
            Ні
          </SharedBtn>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
