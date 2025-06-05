import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { renovationPasswordByEmail } from '@/api/renovationPasswordByEmail';
import { validateEmail } from '@/utils';

import { SharedBtn, SharedInput, SharedItemStatusBar } from '../ui';
import Spinner from '../ui/Spinner';

export const PasswordRenovationSendEmail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [emailUser, setEmailUser] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInputEmail>({
    mode: 'onChange',
  });

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
        const { status } = await renovationPasswordByEmail(email);

        if (status === 200) {
          setIsEmailSent(true);
        }
        if (status === 404) {
          setErrorMessage('Такий email не існує');
        }
        if (status === 401) {
          setErrorMessage('Цей email не підтверджено');
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getUser(emailUser);
  }, [emailUser]);

  return (
    <div className={`flex flex-col h-full gap-8`}>
      <h1 className="leading-[1] text-[32px] lg:text-[64px] text-center lg:text-left">
        Відновлення паролю
      </h1>
      {isEmailSent ? (
        <p className="text-center text-xl lg:w-[500px]">
          Email на адресу <span className="underline">{emailUser}</span>{' '}
          надіслано
        </p>
      ) : (
        <>
          {' '}
          <p className="text-center lg:text-start text-xl lg:w-[500px]">
            Введіть адресу електронної пошти, до якої привʼязаний ваш обліковий
            запис.
          </p>
          <div className={`flex flex-col h-full`}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col rounded-lg gap-8 lg:w-[500px]"
            >
              <div className={`relative`}>
                <SharedInput
                  id="email"
                  autofocus
                  isSubmitted={isSubmitted}
                  onInput={async () => {
                    setErrorMessage('');
                    await trigger('email'); // Trigger validation on input
                  }}
                  placeholder="Введіть email"
                  autocomplete="email"
                  type="email"
                  register={register}
                  validation={{ required: true, validate: validateEmail }}
                  errors={errors}
                />
                {(isSubmitted && errors.email?.message) || errorMessage ? (
                  <SharedItemStatusBar
                    valid={false}
                    text={`${errors.email?.message ?? errorMessage}`}
                    sizeIcon={`w-6 h-6`}
                    className={`absolute mt-[4px]`}
                  />
                ) : null}
              </div>

              <SharedBtn
                type="submit"
                onClick={() => setIsSubmitted(true)}
                // disabled={}
                primary
                className="w-[364px] mx-auto mt-8"
              >
                Продовжити
              </SharedBtn>
            </form>
          </div>
        </>
      )}
      {isLoading && <Spinner rounded />}
    </div>
  );
};
