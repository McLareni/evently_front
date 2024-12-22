import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getUserByEmail } from '@/api/getUserByEmail';
import { validateEmail } from '@/utils';

import {
  GoogleLoginButton,
  PrivacyAgreement,
  SharedInput,
  SharedItemStatusBar,
} from '../ui';
import { SharedBtn } from '../ui/SharedBtn';
import Spinner from '../ui/Spinner';

interface RegisterInputEmailProps {
  setUserData: React.Dispatch<React.SetStateAction<RegisterUser>>;
  // eslint-disable-next-line no-unused-vars
  setStatusAuth: (status: 'register_email' | 'register_password') => void;
  onCloseModal: () => void;
  email: string;
}

export const RegisterInputEmail: React.FC<RegisterInputEmailProps> = ({
  onCloseModal,
  setStatusAuth,
  setUserData,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputEmail>({
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [emailUser, setEmailUser] = useState<string>('');
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: RegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;
    setEmailUser(email);
  };

  useEffect(() => {
    if (!emailUser) return;

    const getUser = async (email: string) => {
      setIsLoading(true);
      try {
        const response = await getUserByEmail(email);

        if (response.emailExist === true) {
          setEmailError(true);
          setErrorMessage('Такий email вже існує');
        } else if (response.status === 403) {
          setEmailError(true);
          setErrorMessage('Користувач з такім email був видалений');
        } else if (response.emailExist === false) {
          setUserData(prev => ({ ...prev, email }));
          setStatusAuth('register_password');
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getUser(emailUser);
  }, [emailUser]);

  return (
    <>
      <h1 className="mb-8">Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <div className={`relative`}>
            <SharedInput
              id="email"
              autofocus
              onInput={() => setEmailError(false)}
              defaultValue={email}
              placeholder="Введіть email"
              autocomplete="email"
              type="email"
              isSubmitted={isSubmitted}
              register={register}
              validation={{ required: true, validate: validateEmail }}
              errors={errors}
            />
            {(isSubmitted && errors.email?.message) || emailError ? (
              <SharedItemStatusBar
                valid={false}
                text={`${errors.email?.message ?? errorMessage}`}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            ) : null}
          </div>
          <span className="text-base ml-auto mr-auto">або</span>

          <GoogleLoginButton onCloseModal={onCloseModal} />

          <SharedBtn
            type="submit"
            onClick={() => setIsSubmitted(true)}
            primary
            className="mt-10 w-[364px] mx-auto"
          >
            Створити акаунт
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
      {isLoading && <Spinner rounded />}
    </>
  );
};
