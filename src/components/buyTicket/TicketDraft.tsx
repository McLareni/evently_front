/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { SharedBtn } from '@/components/ui';

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
  const [shownTooltip, setShownTooltip] = useState(false);

  const showTooltip = () => {
    setShownTooltip(true);
  };

  const hideTooltip = () => {
    setShownTooltip(false);
  };

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
    <div className="bg-[url('/images/ticket/ticket-background.svg')] bg-cover bg-center w-[378px] h-[584px] flex flex-col px-[10px]">
      <div className="overflow-scroll overscroll-contain h-[370px] px-[10px] mt-[20px]">
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

        <div className="flex gap-4 justify-center p-4">
          <div>
            <p className="mb-[16px]">
              {ticketCount} {formattedTicket}
            </p>
            <div className="relative">
              <p className="mb-[16px]">Збір за послуги</p>
              <div
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                className={`absolute -top-3 -right-2 border-[1px]
                border-buttonPurple w-[14px] h-[14px] rounded-full
                flex justify-center items-center`}
              >
                <span className="text-[10px] text-buttonPurple">?</span>
                {shownTooltip && (
                  <div className="absolute left-[20px]">
                    <div className="relative w-[120px]">
                      <img
                        src="/images/ticket/payment-info.svg"
                        width={120}
                        height={120}
                      />
                      <p className="leading-[1.5] text-[12px] absolute left-6 top-[6px]">
                        Плата за обробку
                        <br />
                        замовлення, сервіс
                        <br />і нашу роботу
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p>Сума</p>
          </div>
          <div>
            <div>
              <p className="mb-[16px]">{price} грн</p>
              <p className="mb-[16px]">0 грн</p>
              <p>{price} грн</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto mx-auto">
        <SharedBtn
          onClick={() => setCurrentActionHandler(currentAction + 1)}
          type={currentAction === 1 ? 'button' : 'submit'}
          primary
          className="bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px] mb-[36px]"
        >
          {currentAction === 1 ? 'Продовжити' : 'Оплатити'}
        </SharedBtn>
      </div>
    </div>
  );
};
