import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { statusPassword, validateName, validatePassword } from '@/utils';

import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  SharedItemStatusBar,
  StatusBarPassword,
} from '../ui';

interface RegisterInputPasswordProps {
  // eslint-disable-next-line no-unused-vars
  setStatusAuth: (status: 'confirm_email') => void;
  setUserData: React.Dispatch<React.SetStateAction<RegisterUser>>;
  name: string;
}

export const RegisterInputPassword: React.FC<RegisterInputPasswordProps> = ({
  setStatusAuth,
  setUserData,
  name,
}) => {
  const [onInputPassword, setOnInputPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBluredNameInput, setIsBluredNameInput] = useState('');
  const [requiredPassword, setRequiredPassword] = useState<RequiredPassword>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInputsPassword>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputsPassword) => {
    const { name, password, confirmPassword } = data;

    setUserData(prev => ({ ...prev, password, name, confirmPassword }));
    setStatusAuth('confirm_email');
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);

  // Error handling on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // setErrorMessage('');
    const { name } = e.target;
    if (name === 'name') {
      trigger('name');
    }
    if (name === 'confirmPassword') {
      trigger('confirmPassword');
    }
    if (name === 'password') {
      trigger('password');
    }
    setIsBluredNameInput(name);
  };

  return (
    <>
      <h1 className={`mb-8`}>Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-10 w-[500px]"
        >
          <div className="relative">
            <SharedInput
              id="name"
              autofocus
              defaultValue={name}
              placeholder="Ім'я"
              autocomplete="on"
              type="text"
              isSubmitted={isSubmitted}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{ required: true, validate: validateName }}
              errors={errors}
            />
            {isSubmitted ||
              (isBluredNameInput === 'name' && errors.name?.message && (
                <SharedItemStatusBar
                  valid={false}
                  text={errors.name?.message}
                  sizeIcon={`w-6 h-6`}
                  className={`absolute mt-[4px]`}
                />
              ))}
          </div>
          <div className="relative">
            <SharedInput
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
            Створити акаунт
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </>
  );
};
