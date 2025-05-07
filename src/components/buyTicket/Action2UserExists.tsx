import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { getUser, logIn } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { validateEmail } from '@/utils';

import { SharedBtn } from '../ui';
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
      className="font-lato flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto gap-[20px]"
    >
      {isLoading && <Spinner />}
      <h2 className="font-medium mb-4">Контактна інформація</h2>
      <div className="flex gap-[52px] mb-[8px]">
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

        <div
          className={`bg-lightPurple w-[380px] h-[64px] border-[2px] rounded-[10px]
            px-[24px] outline-none bg-background text-[20px] border-buttonPurple`}
        >
          <p className={`text-sm`}>
            Користувач із цією електронною адресою вже зареєстрований на нашому
            сайті. Щоб увійти, введіть свій пароль.
          </p>
        </div>
      </div>

      <div className="w-[380px]">
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
          placeholder="Введіть пароль"
          id="password"
          htmlFor="password"
          autoComplete="password"
          label="Пароль"
          error={errors?.password?.message}
          width="380"
        />
        <p className="my-[24px] text-center">або</p>
        <button
          type="button"
          className={`mb-[32px] w-[380px] h-[64px] border-[2px] rounded-[10px]
            px-[24px] outline-none bg-background text-[20px] border-buttonPurple
            flex justify-center items-center gap-2`}
        >
          <FcGoogle className="w-10 h-10" />
          Продовжити через Google
        </button>
        <SharedBtn
          // onClick={sendEventData}
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
