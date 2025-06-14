import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { register as registerUser } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import BackButton from '../ui/BackButton';
import Spinner from '../ui/Spinner';
import { Login } from './Login';
import { PasswordRenovationInputPassword } from './PasswordRenovationInputPassword';
import { PasswordRenovationSendEmail } from './PasswordRenovationSendEmail';
import { RegisterConfirmEmail } from './RegisterConfirmEmail';
import { RegisterInputEmail } from './RegisterInputEmail';
import { RegisterInputPassword } from './RegisterInputPassword';
import authImg from '/images/auth-img.webp';

interface AuthProps {
  onCloseModal: () => void;
  isEmailConfirmed: boolean;
  resetPasswordByToken: string | null;
}

export const Auth: React.FC<AuthProps> = ({
  onCloseModal,
  isEmailConfirmed,
  resetPasswordByToken,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [token] = useState(resetPasswordByToken);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [statusAuth, setStatusAuth] = useState<
    | 'login'
    | 'register_email'
    | 'register_password'
    | 'confirm_email'
    | 'password_renovation'
    | 'password_renovation_on_input'
  >('login');

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    onCloseModal();
  };
  const handleStatusAuth = (
    status:
      | 'login'
      | 'register_email'
      | 'register_password'
      | 'confirm_email'
      | 'password_renovation'
      | 'password_renovation_on_input'
  ) => {
    setStatusAuth(status);
  };

  useEffect(() => {
    if (resetPasswordByToken) {
      setStatusAuth('password_renovation_on_input');
    }
  }, []);
  useEffect(() => {
    if (isEmailConfirmed) {
      setStatusAuth('login');
    }
  }, [isEmailConfirmed]);

  useEffect(() => {
    if (!userData.email || !userData.password || !userData.name) return;

    setIsLoading(true);

    const onRegisterUser = async () => {
      try {
        const result = await dispatch(registerUser(userData as RegisterUser));

        if (result.payload.status === 'error') throw new Error();

        toast.success(`Вітаю! ${result.meta.arg.name}. Реєстрація успішна!`);
      } catch (error) {
        console.error(error);
      }
    };
    onRegisterUser();
    setIsLoading(false);
  }, [userData.email, userData.password, userData.name]);

  return (
    <div
      className={`lg:flex flex-row-reverse lg:overflow-hidden
        lg:bg-lightPurple border-collapse lg:border border-gray lg:rounded-[20px]
        h-full`}
    >
      <div className={`flex flex-col pt-12 pb-4 px-[16px] lg:px-[57px]`}>
        {statusAuth !== 'password_renovation_on_input' &&
          statusAuth !== 'password_renovation' &&
          statusAuth !== 'confirm_email' && (
            <p
              className="mb-[16px] lg:hidden font-oswald text-[36px] inline-block text-center"
              style={{
                background:
                  'linear-gradient(98.01deg, #12C2E9 2.11%, #C471ED 75.16%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Тут починається твоя
              <br />
              історія з BookMyEvent!
            </p>
          )}
        {statusAuth === 'login' && (
          <Login
            onCloseModal={handleCloseModal}
            setStatusAuth={handleStatusAuth}
          />
        )}
        {statusAuth === 'register_email' && (
          <>
            <BackButton click={() => setStatusAuth('login')} />
            <RegisterInputEmail
              setUserData={setUserData}
              email={userData.email}
              setStatusAuth={handleStatusAuth}
              onCloseModal={handleCloseModal}
            />
          </>
        )}
        {statusAuth === 'register_password' && (
          <RegisterInputPassword
            setUserData={setUserData}
            setStatusAuth={handleStatusAuth}
            name={userData.name}
          />
        )}
        {statusAuth === 'confirm_email' && (
          <RegisterConfirmEmail setStatusAuth={handleStatusAuth} />
        )}
        {statusAuth === 'password_renovation' && (
          <>
            <BackButton click={() => setStatusAuth('login')} />
            <PasswordRenovationSendEmail />
          </>
        )}
        {statusAuth === 'password_renovation_on_input' && (
          <PasswordRenovationInputPassword
            token={token}
            setStatusAuth={handleStatusAuth}
          />
        )}
      </div>
      <img
        src={authImg}
        alt="colage_posters"
        className="hidden lg:block w-[415px] h-[650px]"
      />
      {isLoading && <Spinner rounded />}
    </div>
  );
};
