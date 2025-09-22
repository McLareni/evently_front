import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { getUser, logIn } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { validateEmail } from '@/utils';

import { GoogleLoginButton, SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

export const Action2UserExists: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const defaultValues: LoginUser = {
    email: '',
    password: '',
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginUser>({ mode: 'onChange', defaultValues });

  const onSubmit: SubmitHandler<LoginUser> = async data => {
    setIsLoading(true);
    try {
      const res = await dispatch(logIn(data));
      console.log(res);
      if ('error' in res) {
        return toast.error('Невірний email або пароль');
      }
      if (res) {
        await dispatch(getUser());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-lato flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto gap-[20px] w-[860px]"
    >
      {isLoading && <Spinner />}
      <h2 className="font-medium">Контактна інформація</h2>
      <div
        className={`flex mb-2 items-center gap-2 lg:w-[380px] text-[20px] border-buttonPurple`}
      >
        <AiOutlineExclamationCircle color="#9B8FF3" />
        <p className={`text-sm`}>
          Користувач вже зареєстрований. Введіть свій пароль.
        </p>
      </div>
      <div className="flex flex-col lg:w-[860px] gap-[52px] mb-[8px]">
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

      <div className="lg:w-[380px]">
        <BuyTicketInput
          {...register('password', {
            required: true,
            validate: value =>
              value.trim().length === 0 ||
              value.length > 8 ||
              'Введіть пароль (мін. 8 символів)',
          })}
          forPassword
          placeholder="Введіть пароль"
          id="password"
          htmlFor="password"
          autoComplete="password"
          label="Пароль"
          error={errors?.password?.message}
          width="380"
        />
        <p className="my-[24px] text-center">або</p>
        <div className="mb-8">
          <GoogleLoginButton />
        </div>
        <SharedBtn
          type="submit"
          primary
          disabled={!isValid}
          className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-full h-[48px]"
        >
          Увійти
        </SharedBtn>
      </div>
    </form>
  );
};
