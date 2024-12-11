import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { sendNewPassword } from '@/api/sendNewPassword';
import { statusPassword, validatePassword } from '@/utils';

import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  SharedItemStatusBar,
  StatusBarPassword,
} from '../ui';
import Spinner from '../ui/Spinner';

interface PasswordRenovationInputPasswordProps {
  token: string | null;
  // eslint-disable-next-line no-unused-vars
  setStatusAuth: (status: 'login' | 'password_renovation_on_input') => void;
}
export const PasswordRenovationInputPassword: React.FC<
  PasswordRenovationInputPasswordProps
> = ({ token, setStatusAuth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBluredNameInput, setIsBluredNameInput] = useState('');
  const [onInputPassword, setOnInputPassword] = useState('');
  const [requiredPassword, setRequiredPassword] = useState<RequiredPassword>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInputsPassword>({
    mode: 'onChange',
  });

  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  const onSubmit = async (data: RegisterFormInputsPassword) => {
    const { password } = data;

    if (!token) return;

    setIsLoading(true);

    try {
      const { status } = await sendNewPassword(password, token);

      if (status === 200) {
        toast.success(`Вітаю твій пароль успішно змінено!`);
        setStatusAuth('login');
      }
      if (status === 400) {
        toast.error(`Пароль має відрізнятись від поточного!`);
      }
    } catch (error) {
      toast.error('Термін токену вичерпано, повторіть спробу!');
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);

  // Error handling on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === 'confirmPassword') {
      trigger('confirmPassword');
    }
    if (name === 'password') {
      trigger('password');
    }
    setIsBluredNameInput(name);
  };

  return (
    <div className={`flex flex-col h-full justify-between`}>
      <h1 className={`mb-8`}>Відновлення паролю</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <div className="relative">
            <SharedInput
              autofocus
              onInput={(value: string) => {
                setOnInputPassword(value);
              }}
              placeholder="Пароль"
              id="password"
              autocomplete="on"
              type="password"
              isSubmitted={isSubmitted}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{ required: true, validate: validatePassword }}
              errors={errors}
            />

            {errors.password?.message && (
              <StatusBarPassword
                requiredPassword={requiredPassword}
                className="absolute mt-[4px]"
              />
            )}
          </div>

          <div className={`relative`}>
            <SharedInput
              placeholder="Підтвердіть пароль"
              id="confirmPassword"
              autocomplete="new-password"
              type="password"
              isSubmitted={isSubmitted}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{
                required: true,
                validate: value => value === watch('password'),
              }}
              errors={errors}
            />
            {(isSubmitted || isBluredNameInput === 'confirmPassword') &&
              errors.confirmPassword && (
                <SharedItemStatusBar
                  valid={false}
                  text="Паролі не співпадають"
                  sizeIcon={``}
                  className={`absolute mt-[4px]`}
                />
              )}
          </div>

          <SharedBtn
            type="submit"
            onClick={() => setIsSubmitted(true)}
            primary
            className={`w-[364px] mt-10 ml-auto mr-auto`}
          >
            Відновити пароль{' '}
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
      {isLoading && <Spinner rounded />}
    </div>
  );
};
