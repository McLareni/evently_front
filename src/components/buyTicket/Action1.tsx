/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ImPriceTag } from 'react-icons/im';

import { BuyTicketInput } from './BuyTicketInput';

interface Action1Props {
  event: Event | undefined;
  getPrice: (price: number) => void;
  getTicketCount: (count: number) => void;
}

export const Action1: React.FC<Action1Props> = ({
  event,
  getPrice,
  getTicketCount,
}) => {
  const [price, setPrice] = useState<number>();
  const [ticketCount, setTicketCount] = useState(1);

  const increment = () => {
    setTicketCount(ticketCount + 1);
  };

  const decrement = () => {
    if (ticketCount === 1) return;
    setTicketCount(ticketCount - 1);
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
          // error={errors?.name?.message}
          width="860"
        />
        <button
          className={`absolute right-8 top-[18px]
          focus:outline-none text-[24px] text-buttonPurple font-medium`}
        >
          Застосувати
        </button>
      </div>
    </div>
  );
};
