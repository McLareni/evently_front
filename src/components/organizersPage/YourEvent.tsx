import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import image from '../../../public/images/YourEvent_image.svg';
import { Auth } from '../auth';
import { Modal } from '../ui';
import { SharedBtn } from '../ui/SharedBtn';

const YourEvent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    if (isLoggedIn) {
      navigate(link);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div className="flex mb-16 pt-3 lg:pt-0 lg:flex-row flex-col-reverse">
        <div className="max-w-[563px] lg:mr-[109px] lg:pt-[162px] text-center lg:text-start">
          <h1
            className="lg:mb-8 mb-4 lg:pb-6 pb-0 text-transparent lg:text-[64px] text-[32px] 
          leading-normal bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]"
          >
            Твій івент — твої можливості
          </h1>
          <p className="pb-8 lg:text-2xl text-base">
            Збирай гостей, продавай квитки, отримуй прибуток
          </p>
          <SharedBtn
            type="button"
            primary
            className="w-[312px] h-12"
            onClick={() => handleLinkClick('/create_event')}
          >
            Створити подію
          </SharedBtn>
        </div>
        <div className="">
          <img src={image} alt="" />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Auth
            onCloseModal={() => setIsModalOpen(false)}
            isEmailConfirmed={isEmailConfirmed}
            resetPasswordByToken={token}
          />
        </Modal>
      </div>
    </>
  );
};

export default YourEvent;
