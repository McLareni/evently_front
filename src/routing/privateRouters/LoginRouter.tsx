import { Navigate } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import MobileProfileTabLayout from '@/components/layout/MobileProfileTabLayout';
import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';

const LoginRouter = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isDesktop } = useMediaVariables();

  return isLoggedIn ? (
    isDesktop ? (
      <ProfileTabLayout />
    ) : (
      <MobileProfileTabLayout />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default LoginRouter;
