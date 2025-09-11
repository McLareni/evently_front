import { Navigate, Outlet } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

const PrivateRouter = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
