import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, logIn } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { validateEmail, validatePassword } from '@/utils';

import { GoogleLoginButton, SharedInput, SharedItemStatusBar } from '../ui';
import { CustomCheckbox } from '../ui/CustomCheckBox';
import { SharedBtn } from '../ui/SharedBtn';
import Spinner from '../ui/Spinner';

export interface IData {
  accessToken: string | boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  userId: string;
  userName: string;
}
interface LoginProps {
  onCloseModal: () => void;
  setStatusAuth: (
    // eslint-disable-next-line no-unused-vars
    status: 'login' | 'register_email' | 'password_renovation'
  ) => void;
}

export const Login: React.FC<LoginProps> = ({
  onCloseModal,
  setStatusAuth,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [emailLoginError, setEmailLoginError] = useState(false);
  const [passwordLoginError, setPasswordLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBluredNameInput, setIsBluredNameInput] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginUser) => {
    setPasswordLoginError(false);
    setEmailLoginError(false);
    setIsBluredNameInput('');
    setIsLoading(true);

    const { email, password, rememberMe } = data;
    try {
      const { payload } = await dispatch(
        logIn({ email, password, rememberMe })
      );
      const { userName, status, message } = payload;

      if (status === 403 && message === 'User banned.') {
        setEmailLoginError(true);
        setErrorMessage('Акаунт заблокований');
      } else if (status === 400 && userName === undefined) {
        setEmailLoginError(true);
        setErrorMessage('Акаунт з таким імейлом не знайдено');
      } else if (status === 403 && message === 'Wrong password') {
        setPasswordLoginError(true);
        setErrorMessage('Невірний пароль');
      } else if (
        status === 403 &&
        message.includes('has been deleted and is no longer accessible.')
      ) {
        setEmailLoginError(true);
        setErrorMessage('Акаунт видалено');
      } else if (status === 401) {
        setEmailLoginError(true);
        setErrorMessage('Імейл не підтверджено');
      } else if (status === 200) {
        toast.success(`Вітаю ${userName}!`);
        dispatch(getUser());
        onCloseModal();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Error handling on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const { name } = e.target;
    if (name === 'email') {
      trigger('email');
    } else {
      trigger('password');
    }
    setIsBluredNameInput(name);
  };

  const handleRememberMeChange = () => {
    setUserData(prevState => ({
      ...prevState,
      rememberMe: !prevState.rememberMe,
    }));
  };

  return (
    <>
      <h1 className="leading-[1] text-[32px] lg:text-[64px] mb-[46px] text-center lg:text-left">
        Увійти в акаунт
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:rounded-lg lg:w-[500px] pb-4 lg:p-0"
      >
        <div className="flex flex-col gap-6 lg:gap-10">
          <div className={`relative`}>
            <SharedInput
              id="email"
              autofocus
              onInput={() => {
                setEmailLoginError(false);
                setPasswordLoginError(false);
              }}
              onBlur={e => handleBlur(e)}
              autocomplete="email"
              placeholder="Введіть email"
              type="email"
              isSubmitted={isSubmitted}
              register={register}
              validation={{ required: true, validate: validateEmail }}
              errors={errors}
            />
            {((isSubmitted || isBluredNameInput === 'email') &&
              errors.email?.message) ||
              (emailLoginError && (
                <SharedItemStatusBar
                  valid={false}
                  text={`${errors.email?.message ?? errorMessage}`}
                  sizeIcon={`w-6 h-6`}
                  className={`absolute mt-[4px]`}
                />
              ))}
          </div>
          <div className={`relative`}>
            <SharedInput
              id="password"
              autocomplete="current-password"
              placeholder="Введіть пароль"
              type="password"
              isSubmitted={isSubmitted}
              onInput={() => setPasswordLoginError(false)}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{ required: true, validate: validatePassword }}
              errors={errors}
            />
            {((isSubmitted || isBluredNameInput === 'password') &&
              errors.password?.message) ||
              (passwordLoginError && (
                <SharedItemStatusBar
                  valid={false}
                  text={`${errors.password?.message ?? errorMessage}`}
                  sizeIcon={`w-6 h-6`}
                  className={`absolute mt-[4px]`}
                />
              ))}
            <button
              type="button"
              onClick={() => setStatusAuth('password_renovation')}
              className={` absolute border-b border-textColor text-[12px] font-normal flex w-22 top-16 right-0`}
            >
              Забули пароль?
            </button>
          </div>
        </div>
        <span className="text-base ml-auto mr-auto my-6">або</span>
        <div
          className={`flex gap-2.5 items-center justify-center h-[70px] bg-bgColor lg:rounded-[20px]`}
        >
          <GoogleLoginButton onCloseModal={onCloseModal} />
        </div>
        <div className={`flex justify-between items-start w-full`}>
          <CustomCheckbox
            checked={userData.rememberMe}
            onChange={handleRememberMeChange}
            label="Запам'ятати мене"
            className={``}
          />

          <div className={`flex flex-col lg:flex-row items-end lg:gap-2`}>
            <span className={`text-black `}> У вас немає акаунту?</span>
            <button
              type="button"
              onClick={() => setStatusAuth('register_email')}
              className={`text-buttonPurple font-bold`}
            >
              Створити
            </button>
          </div>
        </div>
        <SharedBtn
          type="submit"
          onClick={() => setIsSubmitted(true)}
          primary
          className={`lg:w-[364px] lg:mx-auto mt-[20px] lg:mt-[40px]`}
        >
          Увійти
        </SharedBtn>
      </form>
      {isLoading && <Spinner rounded />}
    </>
  );
};
