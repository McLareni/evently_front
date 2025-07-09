/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoTicketOutline } from 'react-icons/io5';

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

  return (
    <div className="mt-auto pt-4">
      <div
        className={`font-lato text-[16px] ${isOpen ? "bg-[url('/images/ticket/open.jpg')] h-[320px]" : "bg-[url('/images/ticket/closed.jpg')] h-[100px]"}
      bg-[length:100%_100%] bg-fill bg-no-repeat bg-center flex flex-col px-[10px] pb-[12px] mb-[24px]`}
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
            <div className="flex justify-center mb-[14px]">
              <IoTicketOutline />
              <p>Квиток</p>
            </div>
            <div className="flex gap-[32px] justify-center">
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
                <p className="mb-[16px]">{price} грн</p>
                {price > 0 && (
                  <p className="mb-[16px]">{priceWithService} грн</p>
                )}
                {discountValue > 0 && (
                  <p className="mb-[16px]">-{discountValue} грн</p>
                )}
                <p className="font-bold">{priceWithDiscount} грн</p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-auto mx-auto">
          <p>
            Сума ({ticketCount} шт.): <span>{priceWithDiscount} грн.</span>
          </p>
        </div>
      </div>
      <div className="flex">
        {currentAction === 1 ? (
          <SharedBtn
            onClick={() => setCurrentActionHandler(2)}
            type="button"
            primary
            className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
          >
            Продовжити
          </SharedBtn>
        ) : (
          <SharedBtn
            onClick={sendEventData}
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
