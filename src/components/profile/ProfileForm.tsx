import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../ui/Button';
import { ProfileInput } from './ProfileInput';

interface UserInfo {
  name: string;
  surname: string;
  birthday: string;
  phoneNumber: string;
}

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UserInfo> = data => {
    console.log(data);
    reset();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-[24px] mb-[8px]">
        <ProfileInput
          {...register('name', {
            required: "Це обов'язкове поле!",
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
            required: "Це обов'язкове поле!",
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
            required: "Це обов'язкове поле!",
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
            required: "Це обов'язкове поле!",
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
