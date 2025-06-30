import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { Auth } from '../auth';
import { Modal } from '../ui';
import { MainLogo } from '../ui/Logo';

const CreateBtnSection = () => {
  const [modalIsOpen, setIsModalOpen] = useState(false);

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop } = useMediaVariables();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/create_event');
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
      <div className="relative w-auto lg:h-40 h-[152px] lg:m-4 lg:my-16 my-6">
        <div className="absolute inset-0 bg-eventDetails lg:blur-md blur-[2.5px] rounded-[20px]"></div>
        <div className="absolute inset-0 bg-background lg:blur-md blur-[2.5px] rounded-[20px] opacity-50"></div>
        <div className="absolute inset-0 z-10 flex lg:flex-row flex-col items-center lg:justify-around justify-evenly px-4 lg:px-0">
          {isDesktop && <MainLogo />}
          <h1 className="lg:text-5xl text-2xl text-center">
            Не знайшов подію своєї мрії? Створи власну!
          </h1>
          <button
            onClick={handleClick}
            className="bg-dark-gradient lg:w-[230px] w-[170px] lg:h-12 h-8 rounded-[71px_8px] text-background lg:text-xl text-sm 
            hover:border-4 hover:border-buttonPurple hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive"
          >
            Створити подію
          </button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onClose={() => setIsModalOpen(false)}>
        <Auth
          onCloseModal={() => setIsModalOpen(false)}
          isEmailConfirmed={isEmailConfirmed}
          resetPasswordByToken={token}
        />
      </Modal>
    </>
  );
};

export default CreateBtnSection;
