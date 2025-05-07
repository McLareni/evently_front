import { store } from '@/redux/store';

import axios from 'axios';

const URL = import.meta.env.VITE_URL;

axios.defaults.baseURL = URL;

export const createEvent = async (
  event: CreateEventFormValues,
  firstImage: File | null,
  secondImage: File | null,
  thirdImage: File | null
) => {
  const token = store.getState().auth.token;

  const formData = new FormData();
  formData.append(
    'event',
    new Blob([JSON.stringify(event)], { type: 'application/json' })
  );
  if (firstImage) formData.append('firstImage', firstImage);
  if (secondImage) formData.append('secondImage', secondImage);
  if (thirdImage) formData.append('thirdImage', thirdImage);
  try {
    const response = await axios.post(`events`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to create event ${error}`);
  }
};

export const editEvent = async (event?: Event) => {
  const token = store.getState().auth.token;

  console.log(event);

  try {
    const response = await axios.put(`events/${event?.id}`, event, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to create event ${error}`);
  }
};

export const buyTicket = async ({
  eventId,
  data,
}: {
  eventId: string;
  data: FullTicketInfo;
}) => {
  const token = store.getState().auth.token;

  const response = (await axios.post(`pay/${eventId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as { data: ResponseWithSignature };

  return response.data;
};

export const checkPromoCode = async ({ promoCode }: { promoCode: string }) => {
  const response = await axios(`pay/promo-code?promoCode=${promoCode}`);

  return response;
};

export const checkUserExists = async ({ email }: { email: string }) => {
  const response = await axios(`authorize/exist/${email}`);

  return response;
};
