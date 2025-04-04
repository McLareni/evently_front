/* eslint-disable no-unused-vars */
import { SharedBtn } from '@/components/ui';

interface TicketDraftProps {
  event: Event | undefined;
  setCurrentActionHandler: (action: number) => void;
  currentAction: number;
}
export const TicketDraft: React.FC<TicketDraftProps> = ({
  event,
  setCurrentActionHandler,
  currentAction,
}) => {
  return (
    <div className="bg-[url('/images/ticket/ticket-background.svg')] bg-cover bg-center w-[378px] h-[584px] p-[32px] flex flex-col">
      <img
        className="h-[200px] w-full object-cover rounded-[10px] mb-[32px]"
        src={event?.images[0].url}
        alt="event image"
      />
      <div className="flex gap-[24px] border-[1px] border-buttonPurple rounded-[10px] p-[16px]">
        <div>
          <p className="mb-[16px]">Дата</p>
          <p className="mb-[16px]">Час</p>
          <p>Місце</p>
        </div>
        <div>
          <p className="mb-[16px]">{event?.date.day}</p>
          <p className="mb-[16px]">
            {event?.date.time} - {event?.date.endTime}
          </p>
          {event?.eventUrl ? (
            <p>Онлайн</p>
          ) : (
            <p>
              {event?.location.city}, {event?.location.street}
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto mx-auto">
        <SharedBtn
          onClick={() => setCurrentActionHandler(currentAction + 1)}
          type={currentAction === 1 ? 'button' : 'submit'}
          primary
          className="bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          {currentAction === 1 ? 'Продовжити' : 'Оплатити'}
        </SharedBtn>
      </div>
    </div>
  );
};
