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

export const editEvent = async (
  id?: string,
  event?: CreateEventFormValues,
  secondImage?: File | null,
  thirdImage?: File | null
) => {
  const token = store.getState().auth.token;

  const formData = new FormData();
  formData.append(
    'event',
    new Blob([JSON.stringify(event)], { type: 'application/json' })
  );
  if (secondImage) formData.append('secondImage', secondImage);
  if (thirdImage) formData.append('thirdImage', thirdImage);

  console.log(event);

  try {
    const response = await axios.put(`events/${id}`, formData, {
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
