import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ImPriceTag } from 'react-icons/im';
import { useParams } from 'react-router';

import { useLazyGetEventByIdQuery } from '@/redux/events/operations';

import { Container } from '@/components/container/Container';

const BuyTicket: React.FC = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [currentAction, setCurrentAction] = useState(1);
  const [price, setPrice] = useState<number>();

  const { idEvent } = useParams();
  const [trigger, { data: event }] = useLazyGetEventByIdQuery();

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
    async function fetchEvent() {
      await trigger(idEvent || '');
    }
    if (idEvent) fetchEvent();
  }, [idEvent, trigger]);

  return (
    <div className="font-oswald leading-none">
      <Container>
        <div className="mb-[10px] flex justify-between">
          <div
            className={`${currentAction === 1 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
          >
            <div>
              <span className="text-[14px]">Оберіть квиток</span>
            </div>
          </div>
          <div
            className={`${currentAction === 2 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
          >
            <div>
              <span className="text-[14px]">Доставка і оплата</span>
            </div>
          </div>
          <div
            className={`${currentAction === 3 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
          >
            <div>
              <span className="text-[14px]">Насолоджуйтесь подією</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="bg-[url('/images/ticket/ticket-info.svg')] bg-cover bg-center w-[860px] h-[250px] px-[64px] py-[36px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[36px]">Вхідний квиток</p>
              <div className="flex gap-[16px]">
                <button
                  onClick={decrement}
                  className="focus:outline-none text-buttonPurple"
                >
                  <AiOutlineMinusCircle size={36} color="buttonPurple" />
                </button>
                <span className="text-[48px]">{ticketCount}</span>
                <button
                  onClick={increment}
                  className="focus:outline-none text-buttonPurple"
                >
                  <AiOutlinePlusCircle size={36} color="buttonPurple" />
                </button>
              </div>
            </div>
            <div className="flex gap-[24px] items-center">
              <ImPriceTag size={38} />
              <span className="text-[48px]">{price}</span>
            </div>
          </div>
          <div className="bg-[url('/images/ticket/ticket-background.svg')] bg-cover bg-center w-[378px] h-[584px]"></div>
        </div>
      </Container>
    </div>
  );
};

export default BuyTicket;
