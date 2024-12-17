import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import Button from '../ui/Button';
import { ProfileInput } from './ProfileInput';

interface UserInfo {
  name: string;
  surname: string;
  birthday: string;
  phoneNumber: string;
  userImage: File | null;
}

interface ProfileFormProps {
  image: File | null;
}

export const ProfileForm: FC<ProfileFormProps> = ({ image }) => {
  const { name } = useAppSelector(selectUser);

  const defaultValues: UserInfo = {
    name: name || '',
    surname: name || '',
    birthday: name || '',
    phoneNumber: name || '',
    userImage: image || null,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const onSubmit: SubmitHandler<UserInfo> = data => {
    console.log(data);
  };

  useEffect(() => {
    setValue('userImage', image || null);
  }, [image, setValue]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-[24px] mb-[8px]">
        <ProfileInput
          {...register('name', {
            validate: {
              required: value => value.trim().length > 1 || "Введіть ім'я",
            },
          })}
          placeholder="Ім'я"
          id="name"
          htmlFor="name"
          type="text"
          error={errors?.name?.message}
        >
          Ім&apos;я
        </ProfileInput>

        <ProfileInput
          {...register('surname', {
            validate: {
              required: value => value.trim().length > 1 || 'Введіть прізвище',
            },
          })}
          placeholder="Прізвище"
          id="surname"
          htmlFor="surname"
          type="text"
          error={errors?.surname?.message}
        >
          Прізвище
        </ProfileInput>
      </div>

      <div className="flex gap-[24px] mb-[32px]">
        <ProfileInput
          {...register('birthday', {
            validate: {
              required: value =>
                value.trim().length > 1 || 'Введіть дату народження',
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
          {...register('phoneNumber', {
            validate: {
              required: value =>
                value.trim().length > 1 || 'Введіть номер телефону',
            },
          })}
          placeholder="Номер телефону"
          id="phoneNumber"
          htmlFor="phoneNumber"
          type="tel"
          error={errors?.phoneNumber?.message}
        >
          Номер телефону
        </ProfileInput>
      </div>
      <div className="ml-auto">
        <Button disabled={!isValid}>Зберегти</Button>
      </div>
    </form>
  );
};
