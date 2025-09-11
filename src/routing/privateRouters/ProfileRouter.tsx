import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import MobileProfileTabLayout from '@/components/layout/MobileProfileTabLayout';
import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';

const LoginRouter = () => {
  const { isDesktop } = useMediaVariables();

  return isDesktop ? <ProfileTabLayout /> : <MobileProfileTabLayout />;
};

export default LoginRouter;
