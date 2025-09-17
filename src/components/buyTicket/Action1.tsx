/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ImPriceTag } from 'react-icons/im';
import { RxCrossCircled } from 'react-icons/rx';
import { toast } from 'react-toastify';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { checkPromoCode } from '@/utils/eventsHttp';

import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action1Props {
  event: Event | undefined;
  getPrice: (price: number) => void;
  getTicketCount: (count: number) => void;
  handleSetDiscount: (value: number) => void;
  discount: number;
  setErrorHandler: (error: number | null) => void;
  errorStatus: number | null;
}

export const Action1: React.FC<Action1Props> = ({
  event,
  getPrice,
  getTicketCount,
  handleSetDiscount,
  discount,
  setErrorHandler,
  errorStatus,
}) => {
  const [price, setPrice] = useState<number>();
  const [ticketCount, setTicketCount] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const increment = () => {
    if (!event?.unlimitedTickets && event?.availableTickets === ticketCount) {
      toast.info('Більше квитків немає в наявності');
      return;
    }
    setTicketCount(ticketCount + 1);
  };

  const decrement = () => {
    if (ticketCount === 1) return;
    setTicketCount(ticketCount - 1);
  };

  const checkPromoCodeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await checkPromoCode({ promoCode });

      if (res.data.status === 404) {
        setErrorHandler(404);
      } else {
        handleSetDiscount(res.data.response.percentage);
        setErrorHandler(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (event) setPrice(event?.price * ticketCount);
  }, [event, ticketCount]);

  useEffect(() => {
    getTicketCount(ticketCount);
    if (price) {
      getPrice(price);
    }
  }, [getPrice, getTicketCount, price, ticketCount]);

  return (
    <div>
      {isLoading && <Spinner />}
      <div
        className={`${isMobile ? "bg-[url('/images/ticket/ticket-info-mobile.svg')]" : "bg-[url('/images/ticket/ticket-info.svg')]"}
        bg-[length:100%_100%] h-[120px] bg-no-repeat bg-fill w-full bg-center lg:w-[860px] lg:h-[250px] px-[32px] lg:px-[64px] py-[16px] lg:py-[36px] flex flex-col justify-between mb-[45px]`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[16px] lg:text-[36px]">Вхідний квиток</p>
          <div className="flex gap-[16px]">
            <button
              onClick={decrement}
              className="focus:outline-none text-buttonPurple"
            >
              <AiOutlineMinusCircle className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]" />
            </button>
            <span className="text-[28px] lg:text-[48px]">{ticketCount}</span>
            <button
              onClick={increment}
              className="focus:outline-none text-buttonPurple"
            >
              <AiOutlinePlusCircle className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]" />
            </button>
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <ImPriceTag className="w-[16px] h-[16px] lg:w-[38px] lg:h-[38px]" />
          <span className="text-[16px] lg:text-[48px]">
            {price !== 0 ? `${price} грн` : 'Безкоштовно'}
          </span>
        </div>
      </div>
      {price !== 0 && (
        <div className="relative">
          <BuyTicketInput
            placeholder="Введіть промокод"
            id="name"
            htmlFor="name"
            type="text"
            label="Промокод"
            discount={discount}
            error={errorStatus === 404 && 'Неправильний промокод'}
            width="860"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromoCode(e.target.value)
            }
            value={promoCode}
          />
          {discount > 0 ? (
            <>
              <p
                className={`absolute right-8 top-[18px]
         text-success text-[24px] text-buttonPurple font-medium`}
              >
                Застосовано
              </p>
              <button
                onClick={() => {
                  handleSetDiscount(0);
                  setPromoCode('');
                }}
                className="focus:outline-none text-buttonPurple absolute -right-[32px] -top-[24px]"
              >
                <RxCrossCircled size={32} />
              </button>
            </>
          ) : (
            <button
              onClick={checkPromoCodeHandler}
              className={`absolute right-8 top-[18px]
          focus:outline-none text-[24px] text-buttonPurple font-medium
          ${errorStatus === 404 && 'text-darkGray'}`}
            >
              Застосувати
            </button>
          )}
        </div>
      )}
    </div>
  );
};
