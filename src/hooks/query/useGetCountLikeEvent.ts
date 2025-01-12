import { useEffect, useState } from 'react';

import { store } from '@/redux/store';

import axios from 'axios';

export const useGetCountLikeEvents = (idEvent: string) => {
  const [count, setCount] = useState(0);

  const getLike = async () => {
    const token = store.getState().auth.token;
    const response = await axios.get(`/liked-events/count/${idEvent}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCount(response.data);
    return;
  };

  useEffect(() => {
    getLike();
  }, []);

  return { count, getLike };
};
