import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, updateUserInfo } from '@/redux/auth/operations';
import { selectIsLoading, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const ObjectsAreEqual = (obj1: UserInfo, obj2: UserInfo) => {
    return (
      obj1.name === obj2.name
      // obj1.surname === obj2.surname &&
      // obj1.birthday === obj2.birthday &&
      // obj1.phone === obj2.phone
      // TODO
      // obj2.userImage instanceof File &&
      // obj1.userImage === obj2.userImage?.name
    );
  };

  const onSubmit: SubmitHandler<UserInfo> = data => {
    if (ObjectsAreEqual(defaultValues, data)) {
      return toast.error('Немає що змінювати');
    }
    const newObj = {
      name: data.name,
    };

    console.log(newObj, data);
    dispatch(updateUserInfo(newObj));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
        >
          Ім&apos;я
        </ProfileInput>

        <ProfileInput
          {...register('surname')}
          placeholder="Прізвище"
          id="surname"
          htmlFor="surname"
          type="text"
        >
          Прізвище
        </ProfileInput>
      </div>

      <div className="flex gap-[24px] mb-[32px]">
        <ProfileInput
          {...register('birthday', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                value.trim().length === 10 ||
                'Введіть дату народження',
            },
          })}
          placeholder="Дата народження"
          id="birthday"
          htmlFor="birthday"
          type="numeric"
          error={errors?.birthday?.message}
        >
          Дата народження
        </ProfileInput>

        <ProfileInput
          {...register('phone', {
            validate: {
              required: value =>
                value.trim().length === 0 ||
                value.trim().length === 12 ||
                'Введіть номер телефону',
            },
          })}
          placeholder="Номер телефону"
          id="phoneNumber"
          htmlFor="phoneNumber"
          type="tel"
          error={errors?.phone?.message}
        >
          Номер телефону
        </ProfileInput>
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
        >
          Введіть новий пароль
        </ProfileInput>
        <ProfileInput
          forPassword
          placeholder="Повторіть пароль"
          id="repeatPassword"
          htmlFor="repeatPassword"
        >
          Повторіть пароль
        </ProfileInput>
      </div>

      <div className="ml-auto">
        <Button type="submit" disabled={!isValid}>
          Зберегти
        </Button>
      </div>
    </form>
  );
};
