/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { SERVICE } from '@/pages/events/BuyTicket';
import { buyTicket } from '@/utils/eventsHttp';

import { SharedBtn } from '@/components/ui';

import Spinner from '../ui/Spinner';
import { PaymentInfo } from './PaymentInfo';

interface TicketDraftProps {
  event: Event | undefined;
  setCurrentActionHandler: (action: number) => void;
  currentAction: number;
  ticketCount: number;
  price: number | undefined;
  info: CustomerInfo | null;
  priceWithDiscount: number;
  discountValue: number;
  isFormValid: boolean;
}

export const TicketDraft: React.FC<TicketDraftProps> = ({
  event,
  setCurrentActionHandler,
  currentAction,
  ticketCount,
  price,
  info,
  priceWithDiscount,
  discountValue,
  isFormValid,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  const sendEventData = async () => {
    setIsLoading(true);
    try {
      if (info && event && price) {
        const eventData = {
          product: {
            productName: event.title,
            productPrice: event.price.toString(),
            productCount: ticketCount.toString(),
            amount: price.toString(),
          },
          userId: info.userId,
          clientFirstName: info.clientFirstName,
          clientLastName: info.clientLastName,
          clientPhone: formatPhoneNumberFromMask(info.clientPhone),
          clientEmail: info.clientEmail,
        };

        const res = await buyTicket({ data: eventData, eventId: event.id });

        if (res) {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = 'https://secure.wayforpay.com/pay';

          const fields: Record<string, string> = {
            merchantAccount: res.merchantAccount,
            merchantAuthType: res.merchantAuthType,
            merchantDomainName: res.merchantDomainName,
            orderReference: res.orderReference,
            orderDate: res.orderDate,
            amount: res.amount,
            currency: res.currency,
            orderTimeout: res.orderTimeout,
            productName: res.product.productName,
            productPrice: res.product.productPrice,
            productCount: res.product.productCount,
            clientFirstName: res.clientFirstName,
            clientLastName: res.clientLastName,
            clientAddress: 'clientAddress',
            clientCity: 'clientCity',
            clientEmail: res.clientEmail,
            defaultPaymentSystem: res.defaultPaymentSystem,
            merchantSignature: res.merchantSignature,
          };

          for (const key in fields) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-lato text-[16px] bg-[url('/images/ticket/ticket-background.svg')] bg-cover bg-center w-[378px] h-[584px] flex flex-col px-[10px] pb-[54px]">
      {isLoading && <Spinner />}
      <div className="overflow-scroll overscroll-contain h-[370px] px-[10px] mt-[20px]">
        <img
          className="h-[200px] w-full object-cover rounded-[10px] mb-[32px]"
          src={event?.images[0].url}
          alt="event image"
        />
        <div className="flex gap-[24px] border-[1px] border-buttonPurple rounded-[10px] p-[16px]">
          <div>
            <p className="mb-[16px] font-bold">Дата</p>
            <p className="mb-[16px] font-bold">Час</p>
            <p className="font-bold">Місце</p>
          </div>
          <div>
            <p className="mb-[16px]">
              {event && formatDateToDayMonth(event?.date.day)}
            </p>
            <p className="mb-[16px]">
              {event?.date.time} - {event?.date.endTime}
            </p>
            {event?.eventUrl ? (
              <div className="relative">
                <p>Онлайн</p>
                <PaymentInfo className="right-7" />
              </div>
            ) : (
              <p>
                {event?.location.city}, {event?.location.street}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-[32px] justify-center p-4 text-[20px]">
          <div>
            <p className="mb-[16px]">
              {ticketCount} {formattedTicket}
            </p>
            <div className="relative">
              <p className="mb-[16px]">Збір за послуги</p>
              <PaymentInfo className="-right-2" />
            </div>
            {discountValue > 0 && <p className="mb-[16px]">Промокод</p>}
            <p>Сума</p>
          </div>
          <div>
            <div>
              <p className="mb-[16px]">{price} грн</p>
              <p className="mb-[16px]">{SERVICE} грн</p>
              {discountValue > 0 && (
                <p className="mb-[16px]">-{discountValue} грн</p>
              )}
              <p className="font-bold">{priceWithDiscount} грн</p>
            </div>
          </div>
        </div>
      </div>
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
  );
};
