import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { SERVICE } from '@/pages/events/BuyTicket';

import { SharedBtn } from '@/components/ui';

import Spinner from '../ui/Spinner';
import { PaymentInfo } from './PaymentInfo';

interface TicketDraftProps {
  event: Event | undefined;
  currentAction: number;
  ticketCount: number;
  price: number;
  priceWithDiscount: number;
  discountValue: number;
  isFormValid: boolean;
  sendEventData: () => Promise<void>;
  isLoading: boolean;
  goToSecondAction: () => void;
  getFreeTicketHandler: () => void;
}

export const TicketDraft: React.FC<TicketDraftProps> = ({
  event,
  currentAction,
  ticketCount,
  price,
  priceWithDiscount,
  discountValue,
  isFormValid,
  sendEventData,
  isLoading,
  goToSecondAction,
  getFreeTicketHandler,
}) => {
  const formatTicket = () => {
    const countString = ticketCount.toString();
    const lastChar = countString.charAt(countString.length - 1);
    const preLastChar = countString.charAt(countString.length - 2);

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

  const priceWithService = (price * SERVICE).toFixed(2);

  return (
    <div
      className={`font-lato text-[16px] bg-[url('/images/ticket/ticket-background.svg')]
    bg-contain bg-no-repeat bg-center min-w-[378px] w-[378px] h-[584px] flex flex-col px-[10px] pb-[54px]`}
    >
      {isLoading && <Spinner />}
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
            {price > 0 && (
              <div className="relative">
                <p className="mb-[16px]">Збір за послуги</p>
                <PaymentInfo className="-right-2" />
              </div>
            )}
            {discountValue > 0 && <p className="mb-[16px]">Промокод</p>}
            <p>Сума</p>
          </div>
          <div>
            <div>
              <p className="mb-[16px]">{price} грн</p>
              {price > 0 && <p className="mb-[16px]">{priceWithService} грн</p>}
              {discountValue > 0 && (
                <p className="mb-[16px]">-{discountValue} грн</p>
              )}
              <p className="font-bold">{priceWithDiscount} грн</p>
            </div>
          </div>
        </div>
      </div>
      {currentAction === 1 ? (
        <SharedBtn
          onClick={goToSecondAction}
          type="button"
          primary
          className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Продовжити
        </SharedBtn>
      ) : (
        <SharedBtn
          onClick={price === 0 ? getFreeTicketHandler : sendEventData}
          type="button"
          primary
          disabled={!isFormValid}
          className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Оплатити
        </SharedBtn>
      )}
    </div>
  );
};
