import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { selectIsLoggedIn, selectUser } from '@/redux/auth/selectors';
import { useLazyGetEventByIdQuery } from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { Action1 } from '@/components/buyTicket/Action1';
import { Action2 } from '@/components/buyTicket/Action2';
import { Action2CheckEmail } from '@/components/buyTicket/Action2CheckEmail';
import { Action2UserExists } from '@/components/buyTicket/Action2UserExists';
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
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState<null | boolean>(null);

  const { idEvent } = useParams();

  const [trigger, { data: event }] = useLazyGetEventByIdQuery();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { email } = useAppSelector(selectUser);

  const setIsEmailExistsHandler = (isExists: boolean) => {
    setIsEmailExists(isExists);
  };

  const setFormValid = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const setErrorHandler = (error: number | null) => {
    setErrorStatus(error);
  };

  const setInfoHandler = (data: CustomerInfo) => {
    setInfo(data);
  };

  const handleSetDiscount = (value: number) => {
    setDiscount(value);
  };

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

  useEffect(() => {
    if (discount > 0) {
      const discountUah = Math.ceil(((price * discount) / 100) * 100) / 100;
      setDiscountValue(discountUah);

      const finalSum = price - discountUah + SERVICE;
      setPriceWithDiscount(finalSum);
    } else {
      setDiscountValue(0);
      setPriceWithDiscount(price + SERVICE);
    }
  }, [discount, price]);
  console.log(isEmailExists);

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
                setErrorHandler={setErrorHandler}
                errorStatus={errorStatus}
              />
            )}
            {currentAction === 2 && isLoggedIn && email && (
              <Action2
                setInfoHandler={setInfoHandler}
                setFormValid={setFormValid}
              />
            )}
            {currentAction === 2 && !isLoggedIn && isEmailExists === null && (
              <Action2CheckEmail
                setIsEmailExistsHandler={setIsEmailExistsHandler}
              />
            )}
            {currentAction === 2 && !isLoggedIn && isEmailExists && (
              <Action2UserExists />
            )}
            <TicketDraft
              event={event}
              setCurrentActionHandler={setCurrentActionHandler}
              currentAction={currentAction}
              ticketCount={ticketCount}
              price={price}
              info={info}
              priceWithDiscount={priceWithDiscount}
              discountValue={discountValue}
              isFormValid={isFormValid}
            />
          </div>
        )}
        {currentAction === 3 && <Action3 event={event} />}
      </Container>
    </div>
  );
};

export default BuyTicket;
