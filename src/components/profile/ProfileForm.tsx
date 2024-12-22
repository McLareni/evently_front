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
  const { name, surname, birthday, phone, image } = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  console.log(image, userImage, isLoading, phone);

  const dispatch = useAppDispatch();

  const defaultValues: UserInfo = {
    name: name || '',
    surname: surname || '',
    birthday: birthday || '',
    phone: phone || '',
    image: image || '',
  };

  const birthdayInputRef = useMask({
    mask: '__.__.____',
    replacement: { _: /\d/ },
  });

  const phoneInputRef = useMask({
    mask: '+__(___)___-__-__',
    replacement: { _: /\d/ },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const ObjectsAreEqual = (obj1: UserInfo, obj2: UserInfo) => {
    return (
      obj1.name === obj2.name &&
      obj1.surname === obj2.surname &&
      // obj1.birthday === obj2.birthday &&
      obj1.phone === obj2.phone
      // TODO
      // obj2.userImage instanceof File &&
      // obj1.userImage === obj2.userImage?.name
    );
  };

  const onSubmit: SubmitHandler<UserInfo> = data => {
    console.log(data);

    const formatPhoneNumber = () => {
      return data.phone.replace(/\D/g, '');
    };
    const formattedPhoneNumber = formatPhoneNumber();
    console.log(data, formattedPhoneNumber);
    if (ObjectsAreEqual(defaultValues, data)) {
      return toast.error('Немає що змінювати');
    }

    const newObj = {
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      phoneNumber: formattedPhoneNumber,
    };

    console.log(newObj);
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
          {...register('name')}
          placeholder="Ім'я"
          id="name"
          htmlFor="name"
          type="text"
          label="Ім'я"
        />

        <ProfileInput
          {...register('surname')}
          placeholder="Прізвище"
          id="surname"
          htmlFor="surname"
          type="text"
          label="Прізвище"
        />
      </div>

      <div className="flex gap-[24px] mb-[32px]">
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <ProfileInput
              {...field}
              ref={birthdayInputRef}
              placeholder="Дата народження"
              id="birthday"
              htmlFor="birthday"
              type="numeric"
              label="Дата народження"
              error={errors?.birthday?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <ProfileInput
              {...field}
              ref={phoneInputRef}
              placeholder="Номер телефону"
              id="phoneNumber"
              htmlFor="phoneNumber"
              type="tel"
              label="Номер телефону"
              error={errors?.phone?.message}
            />
          )}
          // rules={{
          //   required: "Це поле обов'язкове",
          //   validate: value => value.length === 17 || 'Введіть номер телефону',
          // }}
        />
      </div>

      {/* Паролі */}
      <div className="flex flex-col gap-[8px]">
        <p className="mb-[32px] font-oswald text-[24px] font-medium">
          Змінити пароль
        </p>
        <ProfileInput
          forPassword
          placeholder="Введіть новий пароль"
          id="changePassword"
          htmlFor="changePassword"
          autoComplete="new-password"
          label="Введіть новий пароль"
        />

        <ProfileInput
          forPassword
          placeholder="Повторіть пароль"
          id="repeatPassword"
          htmlFor="repeatPassword"
          label="Повторіть пароль"
        />
      </div>

      <Button type="submit" disabled={!isValid}>
        Зберегти
      </Button>
    </form>
  );
};
