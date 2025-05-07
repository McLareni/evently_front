import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/redux/hooks';

import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { validateEmail } from '@/utils';
import { MAX_NAME_LENGTH, validateName } from '@/utils/validateName';
import { useMask } from '@react-input/mask';

import Button from '../ui/Button';
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
    changePassword: '',
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
    const formattedDate = {
      ...data,
      phoneNumber: formatPhoneNumberFromMask(data.phoneNumber),
    };
    // dispatch(updateUserInfo(data));
    // !isLoading && dispatch(getUser());
    console.log(formattedDate);
  };

  return (
    <form
      className="flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading && <Spinner />}
      <div className="flex gap-[24px] mb-[8px]">
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

      <div className="flex gap-[24px] mb-[8px]">
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

      <div className="flex flex-col gap-[8px] mb-[8px]">
        <p className="mb-[32px] font-oswald text-[24px] font-medium">
          Змінити пароль
        </p>
        <BuyTicketInput
          {...register('changePassword', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                value.length > 8 ||
                'Введіть пароль (мін. 8 символів)',
            },
          })}
          forPassword
          placeholder="Введіть новий пароль"
          id="changePassword"
          htmlFor="changePassword"
          autoComplete="new-password"
          label="Введіть новий пароль"
          error={errors?.changePassword?.message}
          width="380"
        />

        <BuyTicketInput
          {...register('repeatPassword', {
            validate: {
              required: value => {
                if (value.trim().length > 0 && value.trim().length < 8) {
                  return 'Повторіть пароль (мін. 8 символів)';
                }
                const password = getValues('changePassword');
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
      </div>

      <Button type="submit" disabled={!isValid}>
        Зберегти
      </Button>
    </form>
  );
};
