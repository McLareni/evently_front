import { useEffect } from 'react';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { EventsApi } from '@/redux/events/operations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useResetRTKEventsApi() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(EventsApi.util.resetApiState());
    }
  }, [dispatch, isLoggedIn]);
}
