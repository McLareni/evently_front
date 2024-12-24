/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, updateUserInfo } from '@/redux/auth/operations';
import { selectIsLoading, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { useMask } from '@react-input/mask';

import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { ProfileInput } from './ProfileInput';

interface ProfileFormProps {
  image: File | null;
}

export const ProfileForm: FC<ProfileFormProps> = ({ image: userImage }) => {
  const { name, surname, birthdayDate, phoneNumber, image } =
    useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  const formatPhoneToMask = () => {
    if (phoneNumber.length === 0) {
      return '';
    }
    const n = phoneNumber.split('');
    const maskedNumber = `+${n[0]}${n[1]}(${n[2]}${n[3]}${n[4]})${n[5]}${n[6]}${n[7]}-${n[8]}${n[9]}-${n[10]}${n[11]}`;
    return maskedNumber;
  };

  const formatBirthDateToMask = () => {
    if (birthdayDate.length === 0) {
      return '';
    }
    const dateToArray = birthdayDate.split('-').reverse().join('.');
    return dateToArray;
  };

  const formatBirthDateFromMask = (data: string) => {
    const dateToArray = data.split('.').reverse().join('-');
    return dateToArray;
  };

  const isValueDate = (value: string) => {
    const date = new Date(formatBirthDateFromMask(value));
    try {
      date.toISOString();
      if (new Date(date.toISOString()) > new Date()) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const defaultValues: UserInfo = {
    name: name || '',
    surname: surname || '',
    birthdayDate: formatBirthDateToMask(),
    phoneNumber: formatPhoneToMask(),
    image: image || '',
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
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const ObjectsAreEqual = (obj1: UserInfo, obj2: UserInfo) => {
    return (
      obj1.name === obj2.name &&
      obj1.surname === obj2.surname &&
      obj1.birthdayDate === obj2.birthdayDate &&
      obj1.phoneNumber === obj2.phoneNumber
      // TODO
      // obj2.userImage instanceof File &&
      // obj1.userImage === obj2.userImage?.name
    );
  };

  const onSubmit: SubmitHandler<UserInfo> = data => {
    const formatPhoneNumber = () => {
      if (data.phoneNumber.length === 0) {
        return '';
      }
      return data.phoneNumber.replace(/\D/g, '');
    };

    const newObj = {
      name: data.name,
      surname: data.surname,
      birthdayDate: formatBirthDateFromMask(data.birthdayDate),
      phoneNumber: formatPhoneNumber(),
      avatarUrl: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg',
    };

    if (ObjectsAreEqual(defaultValues, data)) {
      return toast.error('Немає що змінювати');
    }

    dispatch(updateUserInfo(newObj));

    !isLoading && dispatch(getUser());
  };

  useEffect(() => {
    if (userImage instanceof File) {
      setValue('image', userImage);
    }
  }, [userImage, setValue]);

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

      <div className="flex gap-[24px] mb-[32px]">
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
      <div className="flex flex-col gap-[8px]">
        <p className="mb-[32px] font-oswald text-[24px] font-medium">
          Змінити пароль
        </p>
        <ProfileInput
          {...register('changePassword', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                value.length === 8 ||
                'Введіть пароль (8 символів)',
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
                  return 'Повторіть пароль (8 символів)';
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
