import { useEffect } from 'react';

import { handleLogOut } from '@/redux/auth/authSlice';
import { selectToken } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

export function useLogOutAfterTokenExpires() {
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  const tokenExpires = token && jwtDecode(token).exp;
  const expirationDate = tokenExpires && dayjs(tokenExpires * 1000);
  const expirationDateFormatted =
    expirationDate && expirationDate.format('YYYY-MM-DD HH:mm:ss');
  const todayDateFormatted = dayjs().format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    if (
      expirationDateFormatted &&
      todayDateFormatted > expirationDateFormatted
    ) {
      dispatch(handleLogOut());
    }
  }, [dispatch, expirationDateFormatted, todayDateFormatted]);
}
