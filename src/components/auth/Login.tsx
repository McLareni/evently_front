import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, logIn } from '@/redux/auth/operations';

import { useAppDispatch } from '@/hooks/hooks';
import { ILoginUser } from '@/types';
import { validateEmail, validatePassword } from '@/utils';

import { GoogleLoginButton, SharedInput, SharedItemStatusBar } from '../ui';
import { CustomCheckbox } from '../ui/CustomCheckBox';
import { SharedBtn } from '../ui/SharedBtn';

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
    status: 'login' | 'register_email' | 'password_renovation'
  ) => void;
}

export const Login: React.FC<LoginProps> = ({
  onCloseModal,
  setStatusAuth,
}) => {
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
  } = useForm<ILoginUser>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ILoginUser) => {
    setPasswordLoginError(false);
    setEmailLoginError(false);
    setIsBluredNameInput('');

    const { email, password, rememberMe } = data;
    try {
      const { payload } = await dispatch(
        logIn({ email, password, rememberMe })
      );
      const { userName, status, message } = payload;
      console.log(userName);

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
        setErrorMessage('Цей користувач видаленний за порушення правил');
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
      <h1 className="mb-6">Увійти в акаунт</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-lg gap-10 w-[500px]"
      >
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
            className={` absolute border-b border-textColor text-xs font-normal flex w-22 top-16 right-0`}
          >
            Забули пароль?
          </button>
        </div>
        <span className="text-base ml-auto mr-auto">або</span>
        <div
          className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-bgColor rounded-[20px]`}
        >
          <GoogleLoginButton onCloseModal={onCloseModal} />
        </div>
        <div className={`flex justify-between  w-full -mt-8 h-5`}>
          <CustomCheckbox
            checked={userData.rememberMe}
            onChange={handleRememberMeChange}
            label="Запам'ятати мене"
            className={``}
          />

          <div className={`flex gap-2 text-base`}>
            <span className={`text-black `}> У вас немає акаунту?</span>
            <button
              type="button"
              onClick={() => setStatusAuth('register_email')}
              className={`text-black underline
                `}
            >
              Створити
            </button>
          </div>
        </div>
        <SharedBtn
          type="submit"
          onClick={() => setIsSubmitted(true)}
          primary
          className={`w-[364px] mx-auto`}
        >
          Увійти
        </SharedBtn>
      </form>
    </>
  );
};
