/* eslint-disable no-unused-vars */
import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';

import { SharedBtn } from '@/components/ui';

import { PaymentInfo } from './PaymentInfo';

interface TicketDraftProps {
  event: Event | undefined;
  setCurrentActionHandler: (action: number) => void;
  currentAction: number;
  ticketCount: number;
  price: number | undefined;
}

export const TicketDraft: React.FC<TicketDraftProps> = ({
  event,
  setCurrentActionHandler,
  currentAction,
  ticketCount,
  price,
}) => {
  const formatTicket = () => {
    const countString = ticketCount.toString();
    const lastChar = countString.charAt(countString.length - 1);
    const preLastChar = countString.charAt(countString.length - 2);
    console.log(preLastChar);

    if (preLastChar !== '1' && lastChar === '1') {
      return 'квиток';
    }
    if (preLastChar === '1') {
      return 'квитків';
    }
    if (lastChar === '2' || lastChar === '3' || lastChar === '4') {
      return 'квитки';
    }

    return 'квитків';
  };
  const formattedTicket = formatTicket();

  return (
    <div className="font-lato text-[16px] bg-[url('/images/ticket/ticket-background.svg')] bg-cover bg-center w-[378px] h-[584px] flex flex-col px-[10px] pb-[54px]">
      <div className="overflow-scroll overscroll-contain h-[370px] px-[10px] mt-[20px]">
        <img
          className="h-[200px] w-full object-cover rounded-[10px] mb-[32px]"
          src={event?.images[0].url}
          alt="event image"
        />
        <div className="flex gap-[24px] border-[1px] border-buttonPurple rounded-[10px] p-[16px]">
          <div>
            <p className="mb-[16px] font-bold">Дата</p>
            <p className="mb-[16px] font-bold">Час</p>
            <p className="font-bold">Місце</p>
          </div>
          <div>
            <p className="mb-[16px]">
              {event && formatDateToDayMonth(event?.date.day)}
            </p>
            <p className="mb-[16px]">
              {event?.date.time} - {event?.date.endTime}
            </p>
            {event?.eventUrl ? (
              <div className="relative">
                <p>Онлайн</p>
                <PaymentInfo className="right-7" />
              </div>
            ) : (
              <p>
                {event?.location.city}, {event?.location.street}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-[32px] justify-center p-4 text-[20px]">
          <div>
            <p className="mb-[16px]">
              {ticketCount} {formattedTicket}
            </p>
            <div className="relative">
              <p className="mb-[16px]">Збір за послуги</p>
              <PaymentInfo className="-right-2" />
            </div>
            <p>Сума</p>
          </div>
          <div>
            <div>
              <p className="mb-[16px]">{price} грн</p>
              <p className="mb-[16px]">0 грн</p>
              <p className="font-bold">{price} грн</p>
            </div>
          </div>
        </div>
      </div>
      <SharedBtn
        onClick={() => setCurrentActionHandler(currentAction + 1)}
        type={currentAction === 1 ? 'button' : 'submit'}
        primary
        className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
      >
        {currentAction === 1 ? 'Продовжити' : 'Оплатити'}
      </SharedBtn>
    </div>
  );
};
