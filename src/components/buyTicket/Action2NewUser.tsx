import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import { register as registration } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { validateEmail } from '@/utils';
import { MAX_NAME_LENGTH, validateName } from '@/utils/validateName';
import { useMask } from '@react-input/mask';

import { SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action2NewUserProps {
  newUserEmail: string;
}

export const Action2NewUser: FC<Action2NewUserProps> = ({ newUserEmail }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    formState: { errors, isValid },
  } = useForm<NewUserInfo>({ mode: 'onChange', defaultValues });

  const onSubmit: SubmitHandler<NewUserInfo> = async data => {
    setIsLoading(true);
    const formattedData = {
      ...data,
      phoneNumber: formatPhoneNumberFromMask(data.phoneNumber),
    };
    try {
      const res = await dispatch(registration(formattedData));

      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    console.log(formattedData);
  };

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

      <div className="flex gap-[24px] mb-[24px]">
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
        />

        <BuyTicketInput
          {...register('surname', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                (value.trim().length > 1 && value.trim().length <= 50) ||
                'Введіть прізвище (від 2 до 50 символів)',
            },
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

      <div className="flex gap-[24px] mb-[24px]">
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
            />
          )}
          rules={{
            required: false,
            validate: value => {
              if (value.length !== 17 && value.length > 0)
                return 'Введіть номер телефону';

              if (value.length === 17) {
                if (value[4] !== '0' || value[5] === '0') {
                  return 'Введіть дійсний код українських операторів';
                }
                if (value.includes('000-00-00')) {
                  return 'Введіть правильний номер телефону';
                }
              }
            },
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
            />
          )}
          rules={{
            validate: validateEmail,
          }}
        />
      </div>

      <div className="flex flex-col gap-[24px] mb-[8px] w-[380px]">
        <BuyTicketInput
          {...register('password', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                value.length > 8 ||
                'Введіть пароль (мін. 8 символів)',
            },
          })}
          forPassword
          placeholder="Пароль"
          id="password"
          htmlFor="password"
          autoComplete="new-password"
          label="Пароль"
          error={errors?.password?.message}
          width="380"
        />

        <BuyTicketInput
          {...register('repeatPassword', {
            validate: {
              required: value => {
                if (value.trim().length > 0 && value.trim().length < 8) {
                  return 'Повторіть пароль (мін. 8 символів)';
                }
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
    </form>
  );
};
