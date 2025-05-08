import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { handleLogOut } from '@/redux/auth/authSlice';
import { register as registration } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { statusPassword, validateEmail, validatePassword } from '@/utils';
import {
  MAX_NAME_LENGTH,
  validateName,
  validateSurName,
} from '@/utils/validateName';
import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
import { useMask } from '@react-input/mask';

import { SharedBtn, StatusBarPassword } from '../ui';
import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action2NewUserProps {
  newUserEmail: string;
}

export const Action2NewUser: FC<Action2NewUserProps> = ({ newUserEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requiredPassword, setRequiredPassword] = useState<RequiredPassword>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const dispatch = useAppDispatch();

  const defaultValues: NewUserInfo = {
    name: '',
    surname: '',
    phoneNumber: '',
    email: newUserEmail,
    password: '',
    repeatPassword: '',
  };

  const phoneInputRef = useMask({
    mask: '+38(___)___-__-__',
    replacement: { _: /\d/ },
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<NewUserInfo>({ mode: 'onChange', defaultValues });

  const onInputPassword = watch('password');

  const onSubmit: SubmitHandler<NewUserInfo> = async data => {
    setIsLoading(true);
    const formattedData = {
      ...data,
      phoneNumber: formatPhoneNumberFromMask(data.phoneNumber),
    };
    try {
      const res = await dispatch(registration(formattedData));

      if (res.payload.status === 400) {
        dispatch(handleLogOut());
        return toast.error('Невірні дані');
      }

      if (res.payload.status === 201) {
        dispatch(handleLogOut());
        return toast.success(
          'Лист з підтвердженням реєстрації відправлено на пошту'
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);

  return (
    <form
      className="font-lato flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading && <Spinner />}
      <div
        className={`mb-[36px] bg-lightPurple w-[380px] h-[64px] border-[2px] rounded-[10px]
            px-[24px] outline-none bg-background text-[20px] border-buttonPurple`}
      >
        <p className={`text-sm`}>
          Користувач із цією електронною поштою ще не зареєстрований на нашому
          веб-сайті. Зареєструйтеся для участі.
        </p>
      </div>

      <div className="flex gap-[24px] mb-[32px]">
        <BuyTicketInput
          {...register('name', {
            required: true,
            validate: validateName,
          })}
          maxLength={MAX_NAME_LENGTH}
          placeholder="Ім'я"
          id="name"
          htmlFor="name"
          type="text"
          label="Ім'я"
          error={errors?.name?.message}
          width="380"
          showRequired
        />

        <BuyTicketInput
          {...register('surname', {
            validate: validateSurName,
          })}
          placeholder="Прізвище"
          id="surname"
          htmlFor="surname"
          type="text"
          label="Прізвище"
          error={errors?.surname?.message}
          width="380"
        />
      </div>

      <div className="flex gap-[24px] mb-[32px]">
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <BuyTicketInput
              {...field}
              ref={phoneInputRef}
              placeholder="+38(099)999-99-99"
              id="phoneNumber"
              htmlFor="phoneNumber"
              type="tel"
              label="Номер телефону"
              error={errors?.phoneNumber?.message}
              width="380"
              showRequired
            />
          )}
          rules={{
            required: true,
            validate: validatePhoneNumber,
          }}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <BuyTicketInput
              {...field}
              placeholder="Введіть електронну пошту"
              id="birthday"
              htmlFor="birthday"
              type="numeric"
              label="Електронна пошта"
              error={errors?.email?.message}
              width="380"
              showRequired
            />
          )}
          rules={{
            validate: validateEmail,
          }}
        />
      </div>

      <div className="relative w-[500px]">
        <div className="flex flex-col gap-[32px] w-[380px]">
          <div>
            <BuyTicketInput
              {...register('password', {
                validate: validatePassword,
              })}
              forPassword
              placeholder="Пароль"
              id="password"
              htmlFor="password"
              autoComplete="new-password"
              label="Пароль"
              width="380"
              showRequired
            />
            {errors.password?.message && (
              <div>
                <StatusBarPassword
                  requiredPassword={requiredPassword}
                  className="absolute mt-[4px]"
                />
              </div>
            )}
          </div>

          <BuyTicketInput
            {...register('repeatPassword', {
              validate: {
                required: value => {
                  const password = getValues('password');
                  if (value.trim() !== password) {
                    return 'Паролі не збігаються';
                  }
                },
              },
            })}
            forPassword
            placeholder="Повторіть пароль"
            id="repeatPassword"
            htmlFor="repeatPassword"
            label="Повторіть пароль"
            error={errors?.repeatPassword?.message}
            width="380"
            showRequired
          />
          <p className="text-center">або</p>
          <button
            type="button"
            className={`mb-[8px] w-[380px] h-[64px] border-[2px] rounded-[10px]
                          px-[24px] outline-none bg-background text-[20px] border-buttonPurple
                          flex justify-center items-center gap-2`}
          >
            <FcGoogle className="w-10 h-10" />
            Продовжити через Google
          </button>
          <SharedBtn
            disabled={!isValid}
            type="submit"
            primary
            className="mt-auto w-full bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
          >
            Створити акаунт
          </SharedBtn>
        </div>
      </div>
    </form>
  );
};
