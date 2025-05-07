/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { validateEmail } from '@/utils';
import { checkUserExists } from '@/utils/eventsHttp';

import { SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action2CheckEmailProps {
  setIsEmailExistsHandler: (isExists: boolean) => void;
  setNewUserEmailHandler: (email: string) => void;
}

export const Action2CheckEmail: FC<Action2CheckEmailProps> = ({
  setIsEmailExistsHandler,
  setNewUserEmailHandler,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: { email: string } = {
    email: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BuyTicketUser>({ mode: 'onChange', defaultValues });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    setNewUserEmailHandler(data.email);
    try {
      const res = await checkUserExists({ email: data.email });
      setIsEmailExistsHandler(res.data.emailExist);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto gap-[20px]"
    >
      {isLoading && <Spinner />}
      <h2 className="font-medium mb-4">Контактна інформація</h2>
      <div className="flex flex-col gap-[8px]">
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
