import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { selectIsLoggedIn, selectUser } from '@/redux/auth/selectors';
import { useLazyGetEventByIdQuery } from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useSendEventData } from '@/hooks/buyTicket/useSendEventData';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { Action1 } from '@/components/buyTicket/Action1';
import { Action2 } from '@/components/buyTicket/Action2';
import { Action2CheckEmail } from '@/components/buyTicket/Action2CheckEmail';
import { Action2NewUser } from '@/components/buyTicket/Action2NewUser';
import { Action2UserExists } from '@/components/buyTicket/Action2UserExists';
import { Action3 } from '@/components/buyTicket/Action3';
import { Action3FreeMobile } from '@/components/buyTicket/Action3FreeMobile';
import { BuyTicketTabs } from '@/components/buyTicket/BuyTicketTabs';
import { MobileTicketInfo } from '@/components/buyTicket/MobileTicketInfo';
import { TicketDraftMobile } from '@/components/buyTicket/TicketDraftMobile';
import { Container } from '@/components/container/Container';
import Spinner from '@/components/ui/Spinner';

import { TicketDraft } from '../../components/buyTicket/TicketDraft';

export const SERVICE = 0.05; //5%

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
  const [newUserEmail, setNewUserEmail] = useState('');

  const { idEvent } = useParams();

  const [trigger, { data: event, isLoading }] = useLazyGetEventByIdQuery();

  const { sendEventData, isLoading: sendDataLoading } = useSendEventData({
    event,
    info,
    price,
    priceWithDiscount,
    ticketCount,
  });

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { email } = useAppSelector(selectUser);

  const { isMobile } = useMediaVariables();

  const setNewUserEmailHandler = (email: string) => {
    setNewUserEmail(email);
  };

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
      const response = await trigger(idEvent as string);

      if (response.status === 'uninitialized') {
        fetchEvent();
      }
    }

    if (idEvent) fetchEvent();
  }, [event, idEvent, trigger]);

  useEffect(() => {
    if (discount > 0) {
      const discountUah = Math.ceil(((price * discount) / 100) * 100) / 100;
      setDiscountValue(discountUah);

      const finalSum = price - discountUah + price * SERVICE;
      setPriceWithDiscount(finalSum);
    } else {
      setDiscountValue(0);
      setPriceWithDiscount(price + price * SERVICE);
    }
  }, [discount, price]);
  console.log(currentAction);

  return (
    <div className="font-oswald leading-none pb-[55px] h-full">
      {isLoading && <Spinner />}
      <Container className="h-full flex flex-col">
        {!isMobile && <BuyTicketTabs currentAction={currentAction} />}
        {isMobile && event && <MobileTicketInfo event={event} />}
        {(currentAction === 1 || currentAction === 2) && (
          <div className="lg:flex lg:gap-[80px]">
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
                setNewUserEmailHandler={setNewUserEmailHandler}
                setIsEmailExistsHandler={setIsEmailExistsHandler}
              />
            )}
            {currentAction === 2 && !isLoggedIn && isEmailExists && (
              <Action2UserExists />
            )}
            {currentAction === 2 && !isLoggedIn && isEmailExists === false && (
              <Action2NewUser newUserEmail={newUserEmail} />
            )}
            {!isMobile && (
              <TicketDraft
                event={event}
                setCurrentActionHandler={setCurrentActionHandler}
                currentAction={currentAction}
                ticketCount={ticketCount}
                price={price}
                priceWithDiscount={priceWithDiscount}
                discountValue={discountValue}
                isFormValid={isFormValid}
                sendEventData={sendEventData}
                isLoading={sendDataLoading}
              />
            )}
          </div>
        )}
        {isMobile && currentAction !== 3 && (
          <TicketDraftMobile
            setCurrentActionHandler={setCurrentActionHandler}
            currentAction={currentAction}
            ticketCount={ticketCount}
            price={price}
            priceWithDiscount={priceWithDiscount}
            discountValue={discountValue}
            isFormValid={isFormValid}
            sendEventData={sendEventData}
            isLoading={sendDataLoading}
          />
        )}
        {isMobile && currentAction === 3 && <Action3FreeMobile event={event} />}
        {!isMobile && currentAction === 3 && <Action3 event={event} />}
      </Container>
    </div>
  );
};

export default BuyTicket;
