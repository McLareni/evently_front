/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ImPriceTag } from 'react-icons/im';
import { RxCrossCircled } from 'react-icons/rx';

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

  const increment = () => {
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
      <div className="bg-[url('/images/ticket/ticket-info.svg')] bg-cover bg-center w-[860px] h-[250px] px-[64px] py-[36px] flex flex-col justify-between mb-[45px]">
        <div className="flex items-center justify-between">
          <p className="text-[36px]">Вхідний квиток</p>
          <div className="flex gap-[16px]">
            <button
              onClick={decrement}
              className="focus:outline-none text-buttonPurple"
            >
              <AiOutlineMinusCircle size={36} />
            </button>
            <span className="text-[48px]">{ticketCount}</span>
            <button
              onClick={increment}
              className="focus:outline-none text-buttonPurple"
            >
              <AiOutlinePlusCircle size={36} />
            </button>
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <ImPriceTag size={38} />
          <span className="text-[48px]">
            {price !== 0 ? `${price} грн` : 'Безкоштовно'}
          </span>
        </div>
      </div>
      <div className="relative">
        <BuyTicketInput
          placeholder="Введіть промокод"
          id="name"
          htmlFor="name"
          type="text"
          label="Промокод"
          discount={discount}
          error={errorStatus === 404 && 'Невалідний промокод'}
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
              className="focus:outline-none text-buttonPurple absolute -right-[32px] -top-[32px]"
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
    </div>
  );
};
