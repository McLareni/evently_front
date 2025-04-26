import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useLazyGetEventByIdQuery } from '@/redux/events/operations';

import { Action1 } from '@/components/buyTicket/Action1';
import { Action2 } from '@/components/buyTicket/Action2';
import { Action3 } from '@/components/buyTicket/Action3';
import { BuyTicketTabs } from '@/components/buyTicket/BuyTicketTabs';
import { Container } from '@/components/container/Container';

import { TicketDraft } from '../../components/buyTicket/TicketDraft';

export const SERVICE = 45;

const BuyTicket: React.FC = () => {
  const [currentAction, setCurrentAction] = useState(1);
  const [price, setPrice] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [info, setInfo] = useState<CustomerInfo | null>(null);
  const [discount, setDiscount] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (discount > 0) {
      const discountUah = Math.ceil(((price * discount) / 100) * 100) / 100;
      setDiscountValue(discountUah);

      const finalSum = price - discountUah + SERVICE;
      setPriceWithDiscount(finalSum);
    } else {
      setPriceWithDiscount(price);
    }
  }, [discount, price]);

  const setInfoHandler = (data: CustomerInfo) => {
    setInfo(data);
  };

  const handleSetDiscount = (value: number) => {
    setDiscount(value);
  };

  const { idEvent } = useParams();

  const [trigger, { data: event }] = useLazyGetEventByIdQuery();

  const setCurrentActionHandler = (action: number) => {
    setCurrentAction(action);
  };

  const getPrice = (price: number) => {
    setPrice(price);
  };

  const getTicketCount = (count: number) => {
    setTicketCount(count);
  };

  useEffect(() => {
    async function fetchEvent() {
      await trigger(idEvent || '');
    }
    if (idEvent) fetchEvent();
  }, [idEvent, trigger]);

  return (
    <div className="font-oswald leading-none pb-[55px]">
      <Container>
        <BuyTicketTabs currentAction={currentAction} />
        {(currentAction === 1 || currentAction === 2) && (
          <div className="flex justify-between">
            {currentAction === 1 && (
              <Action1
                event={event}
                getPrice={getPrice}
                getTicketCount={getTicketCount}
                handleSetDiscount={handleSetDiscount}
                discount={discount}
              />
            )}
            {currentAction === 2 && <Action2 setInfoHandler={setInfoHandler} />}
            <TicketDraft
              event={event}
              setCurrentActionHandler={setCurrentActionHandler}
              currentAction={currentAction}
              ticketCount={ticketCount}
              price={price}
              info={info}
              priceWithDiscount={priceWithDiscount}
              discountValue={discountValue}
            />
          </div>
        )}
        {currentAction === 3 && <Action3 event={event} />}
      </Container>
    </div>
  );
};

export default BuyTicket;
