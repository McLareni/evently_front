import { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { Auth } from '@/components/auth';
import { Modal } from '@/components/ui';
import { AuthMobileModal } from '@/components/ui/AuthMobileModal';

interface PrivateLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const PrivateLink: React.FC<PrivateLinkProps> = ({
  to,
  children,
  className,
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isMobile } = useMediaVariables();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate(to);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('emailConfirmed') === 'true') {
      setIsEmailConfirmed(true);
      setIsModalOpen(true);
    }
    if (params.get('token')) {
      setToken(params.get('token'));
      setIsModalOpen(true);
    }
    return () => setToken(null);
  }, [location]);

  return (
    <>
      <div onClick={handleClick} className={'cursor-pointer ' + className}>
        {children}
      </div>

      {isMobile ? (
        <AuthMobileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hiddenHeader
        >
          <Auth
            onCloseModal={() => setIsModalOpen(false)}
            isEmailConfirmed={isEmailConfirmed}
            resetPasswordByToken={token}
          />
        </AuthMobileModal>
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Auth
            onCloseModal={() => setIsModalOpen(false)}
            isEmailConfirmed={isEmailConfirmed}
            resetPasswordByToken={token}
          />
        </Modal>
      )}
    </>
  );
};

export default PrivateLink;
