import axios from 'axios';

const changeEventStatus = async (id: string, status: string) => {
  try {
    const response = await axios.patch(`/events/${id}/status?status=${status}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to change event status ${error}`);
  }
};

export { changeEventStatus };
