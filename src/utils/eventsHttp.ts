import axios from 'axios';

const URL = 'https://66ceec99901aab24842029e0.mockapi.io';

axios.defaults.baseURL = 'https://rendereventapp.onrender.com/api/v1/';

export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(`${URL}/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete event ${error}`);
  }
};

export const getEvent = async (id?: string) => {
  if (id === 'new') {
    return {};
  }

  try {
    const response = await axios(`${URL}/events/${id}`);
    const resData: Event = response.data;

    return resData;
  } catch (error) {
    throw new Error(`Failed to get event ${error}`);
  }
};

export const editEvent = async (formData: eventType, id?: string) => {
  try {
    const response = await axios.put(`${URL}/events/${id}`, {
      ...formData,
      countSeats: formData.countSeats || 'Необмежено',
    });
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error(`Failed to edit event ${error}`);
  }
};

export const createEvent = async (formData: eventType) => {
  try {
    const response = await axios.post(
      `https://66ceec99901aab24842029e0.mockapi.io/events/`,
      {
        ...formData,
        countSeats: formData.countSeats || 'Необмежено',
      }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error(`Failed to create event ${error}`);
  }
};

export const addEventToLiked = async (userId: string, eventId: string) => {
  try {
    const response = await axios.post(`liked-events`, {
      userId,
      eventId,
    });
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to add to liked');
  }
};

export const removeEventFromLiked = async (userId: string, eventId: string) => {
  try {
    const response = await axios.delete(`liked-events`, {
      data: {
        userId,
        eventId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to remove from liked ${error}`);
  }
};
