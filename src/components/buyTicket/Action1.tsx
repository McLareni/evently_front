/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ImPriceTag } from 'react-icons/im';

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
    if (price) {
      getPrice(price);
      getTicketCount(ticketCount);
    }
  }, [getPrice, getTicketCount, price, ticketCount]);

  return (
    <div className="bg-[url('/images/ticket/ticket-info.svg')] bg-cover bg-center w-[860px] h-[250px] px-[64px] py-[36px] flex flex-col justify-between">
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
          {price !== 0 ? price : 'Безкоштовно'}
        </span>
      </div>
    </div>
  );
};
