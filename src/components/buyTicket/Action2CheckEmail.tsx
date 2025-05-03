/* eslint-disable no-unused-vars */
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { selectIsLoading } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { validateEmail } from '@/utils';
import { checkUserExists } from '@/utils/eventsHttp';

import { SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action2CheckEmailProps {
  setIsEmailExistsHandler: (isExists: boolean) => void;
}

export const Action2CheckEmail: FC<Action2CheckEmailProps> = ({
  setIsEmailExistsHandler,
}) => {
  const isLoading = useAppSelector(selectIsLoading);

  const defaultValues: { email: string } = {
    email: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BuyTicketUser>({ mode: 'onChange', defaultValues });

  const onSubmit = async (data: { email: string }) => {
    const res = await checkUserExists({ email: data.email });
    setIsEmailExistsHandler(res.data.emailExist);
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto gap-[20px]"
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
        <SharedBtn
          disabled={!isValid}
          type="submit"
          primary
          className="mt-auto mx-auto bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Продовжити
        </SharedBtn>
      </div>
    </form>
  );
};
