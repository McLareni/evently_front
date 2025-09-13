/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { CgShoppingCart } from 'react-icons/cg';
import { IoTicketOutline } from 'react-icons/io5';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import { SERVICE } from '@/pages/events/BuyTicket';

import { SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { PaymentInfo } from './PaymentInfo';

interface TicketDraftMobileProps {
  setCurrentActionHandler: (action: number) => void;
  currentAction: number;
  ticketCount: number;
  price: number;
  priceWithDiscount: number;
  discountValue: number;
  isFormValid: boolean;
  sendEventData: () => Promise<void>;
  isLoading: boolean;
}

export const TicketDraftMobile: FC<TicketDraftMobileProps> = ({
  setCurrentActionHandler,
  currentAction,
  ticketCount,
  price,
  priceWithDiscount,
  discountValue,
  isFormValid,
  sendEventData,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const scrollToTop = useScrollToTop();

  const currentActionHandler = () => {
    if (currentAction === 1) {
      setCurrentActionHandler(2);
    } else if (currentAction === 2 && price === 0) {
      setCurrentActionHandler(3);
    }
    scrollToTop();
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="mt-auto pt-4">
      <div
        className={`font-lato text-[16px] ${isOpen ? "bg-[url('/images/ticket/open.jpg')] h-[320px]" : "bg-[url('/images/ticket/closed.jpg')] h-[100px]"}
      bg-[length:100%_100%] bg-fill bg-no-repeat bg-center flex flex-col px-[10px] pb-[12px] mb-[24px]
      bg-[rgba(255,255,255,0.6)] bg-blend-overlay `}
      >
        {isLoading && <Spinner />}
        <button
          className="mx-auto text-buttonPurple focus:outline-none"
          onClick={toggleIsOpen}
        >
          {isOpen ? <BiChevronDown size={32} /> : <BiChevronUp size={32} />}
        </button>
        {isOpen && (
          <div className="pt-[60px] text-[20px]">
            <div className="flex justify-center gap-2 mb-[14px]">
              <IoTicketOutline />
              <p className="mb-[16px]">
                {ticketCount} {formattedTicket}
              </p>
            </div>
            <div className="flex gap-[32px] justify-center">
              <div>
                <p className="mb-[16px]">Ціна</p>
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
                <p className="mb-[16px]">{price / ticketCount} грн</p>
                {price > 0 && (
                  <p className="mb-[16px]">{priceWithService} грн</p>
                )}
                {discountValue > 0 && (
                  <p className="mb-[16px]">-{discountValue} грн</p>
                )}
                <p className="font-bold">{price} грн</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-auto mb-2 px-8">
          <div className="flex items-center gap-2">
            <CgShoppingCart size={32} />
            <p>
              Сума ({ticketCount} шт.): <span>{priceWithDiscount} грн</span>
            </p>
          </div>
          <p className="text-error">{formatTime(timeLeft)}</p>
        </div>
      </div>
      <div className="flex">
        {currentAction === 1 ? (
          <SharedBtn
            onClick={currentActionHandler}
            type="button"
            primary
            className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
          >
            Продовжити
          </SharedBtn>
        ) : (
          <SharedBtn
            onClick={price === 0 ? currentActionHandler : sendEventData}
            type="button"
            primary
            disabled={!isFormValid}
            className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
          >
            Оплатити
          </SharedBtn>
        )}
      </div>
    </div>
  );
};
