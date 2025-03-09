/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, updateUserInfo } from '@/redux/auth/operations';
import { selectIsLoading, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  formatBirthDateFromMask,
  formatPhoneNumberFromMask,
  isValueDate,
} from '@/helpers/userForm/formatFromMask';
import {
  formatBirthDateToMask,
  formatPhoneToMask,
} from '@/helpers/userForm/formatToMask';
import { useMask } from '@react-input/mask';

import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { ProfileInput } from './ProfileInput';

export const ProfileForm: FC = () => {
  const { name, surname, birthdayDate, phoneNumber } =
    useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  const defaultValues: UserInfo = {
    name: name || '',
    surname: surname || '',
    birthdayDate: formatBirthDateToMask(birthdayDate),
    phoneNumber: formatPhoneToMask(phoneNumber),
    changePassword: '',
    repeatPassword: '',
  };

  const birthdayInputRef = useMask({
    mask: '__.__.____',
    replacement: { _: /\d/ },
  });

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
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const SearchChanges = (obj1: UserInfo, obj2: UserInfo) => {
    return {
      ...(obj1.name !== obj2.name && { name: obj2.name }),
      ...(obj1.surname !== obj2.surname && { surname: obj2.surname }),
      ...(obj1.birthdayDate !== obj2.birthdayDate && {
        birthdayDate: formatBirthDateFromMask(obj2.birthdayDate),
      }),
      ...(obj1.phoneNumber !== obj2.phoneNumber && {
        phoneNumber: formatPhoneNumberFromMask(obj2.phoneNumber),
      }),
      ...(obj1.changePassword !== obj2.changePassword && {
        password: obj2.changePassword,
      }),
    };
  };

  const onSubmit: SubmitHandler<UserInfo> = data => {
    const newObj = SearchChanges(defaultValues, data);
    if (Object.keys(newObj).length === 0) {
      return toast.error('Немає що змінювати');
    }
    dispatch(updateUserInfo(newObj));
    !isLoading && dispatch(getUser());
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Spinner />}
      <div className="flex gap-[24px] mb-[8px]">
        <ProfileInput
          {...register('name', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                (value.trim().length > 1 && value.trim().length <= 50) ||
                "Введіть ім'я (від 2 до 50 символів)",
            },
          })}
          placeholder="Ім'я"
          id="name"
          htmlFor="name"
          type="text"
          label="Ім'я"
          error={errors?.name?.message}
        />

        <ProfileInput
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
        />
      </div>

      <div className="flex gap-[24px] mb-[8px]">
        <Controller
          name="birthdayDate"
          control={control}
          render={({ field }) => (
            <ProfileInput
              {...field}
              ref={birthdayInputRef}
              placeholder="ДД.ММ.РРРР"
              id="birthday"
              htmlFor="birthday"
              type="numeric"
              label="Дата народження"
              error={errors?.birthdayDate?.message}
            />
          )}
          rules={{
            required: false,
            validate: value => {
              if (value.length > 0 && value.length < 10) {
                return 'Введіть дату народження';
              }
              if (!isValueDate(value) && value.length !== 0) {
                return 'Невірний формат дати';
              }
            },
          }}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <ProfileInput
              {...field}
              ref={phoneInputRef}
              placeholder="099 999 99 99"
              id="phoneNumber"
              htmlFor="phoneNumber"
              type="tel"
              label="Номер телефону"
              error={errors?.phoneNumber?.message}
            />
          )}
          rules={{
            required: false,
            validate: value =>
              value.length === 0 ||
              value.length === 17 ||
              'Введіть номер телефону',
          }}
        />
      </div>

      {/* Паролі не підключені */}
      <div className="flex flex-col gap-[8px] mb-[8px]">
        <p className="mb-[32px] font-oswald text-[24px] font-medium">
          Змінити пароль
        </p>
        <ProfileInput
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
        />

        <ProfileInput
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
        />
      </div>

      <Button type="submit" disabled={!isValid}>
        Зберегти
      </Button>
    </form>
  );
};
