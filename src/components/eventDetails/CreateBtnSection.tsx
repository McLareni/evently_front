import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

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
      <div className="relative w-auto h-40 m-4 my-16">
        <div className="absolute inset-0 bg-eventDetails blur-md rounded-[20px]"></div>
        <div className="absolute inset-0 bg-background blur-md rounded-[20px] opacity-50"></div>
        <div className="absolute inset-0 z-10 flex items-center justify-around ">
          <MainLogo />
          <h1 className="text-5xl">
            Не знайшли події своєї мрії? Створи власну!
          </h1>
          <button
            onClick={handleClick}
            className="bg-dark-gradient w-[230px] h-12 rounded-[71px_8px] text-background text-xl  hover:border-4 hover:border-buttonPurple hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive"
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
