import { useState } from 'react';

import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { buyTicket } from '@/utils/eventsHttp';

interface useSendEventDataProps {
  ticketCount: number;
  event: Event | undefined;
  info: CustomerInfo | null;
  priceWithDiscount: number;
  price: number;
}

export const useSendEventData = ({
  ticketCount,
  event,
  info,
  priceWithDiscount,
  price,
}: useSendEventDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEventData = async () => {
    setIsLoading(true);
    try {
      if (info && event && price) {
        const eventData = {
          product: {
            productName: event.title,
            productPrice: event.price.toString(),
            productCount: ticketCount.toString(),
            amount: priceWithDiscount.toString(),
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
            serviceUrl: res.serviceUrl,
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

  return { sendEventData, isLoading };
};
