import { store } from '@/redux/store';

import axios from 'axios';

const changeEventStatus = async (
  id: string,
  status: 'APPROVED' | 'CANCELLED' | ''
) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.patch(
      `/admin/events/${id}/status?status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to change event status ${error}`);
  }
};

const fetchAdminEvent = async () => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(`/admin/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get event. ${error}`);
  }
};

export { changeEventStatus, fetchAdminEvent };
