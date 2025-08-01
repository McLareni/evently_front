/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineExclamation } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import { selectIsLoading, selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { formatPhoneToMask } from '@/helpers/userForm/formatToMask';
import { validateEmail } from '@/utils';
import {
  MAX_NAME_LENGTH,
  validateName,
  validateSurName,
} from '@/utils/validateName';
import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
import { useMask } from '@react-input/mask';

import Spinner from '../ui/Spinner';
import { BuyTicketInput } from './BuyTicketInput';

interface Action2Props {
  setInfoHandler: (data: CustomerInfo) => void;
  setFormValid: (isValid: boolean) => void;
}

export const Action2: FC<Action2Props> = ({ setInfoHandler, setFormValid }) => {
  const [agreement, setAgreement] = useState(false);

  const { name, surname, phoneNumber, email, id } = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const defaultValues: BuyTicketUser = {
    id: id || '',
    name: name || '',
    surname: surname || '',
    email: email || '',
    phoneNumber: formatPhoneToMask(phoneNumber),
  };

  const phoneInputRef = useMask({
    mask: '+38(___)___-__-__',
    replacement: { _: /\d/ },
  });

  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<BuyTicketUser>({ mode: 'onChange', defaultValues });

  const userId = watch('id');
  const clientFirstName = watch('name');
  const clientLastName = watch('surname');
  const clientEmail = watch('email');
  const clientPhone = watch('phoneNumber');

  useEffect(() => {
    const tickerInfo = {
      userId: userId,
      clientFirstName: clientFirstName,
      clientLastName: clientLastName,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
    };

    setInfoHandler(tickerInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientEmail, clientFirstName, clientLastName, clientPhone]);

  const checkAgreement = () => {
    setAgreement(!agreement);
  };

  useEffect(() => {
    setFormValid(isValid);
  }, [isValid, setFormValid]);

  return (
    <form className="font-lato flex flex-col border-[2px] border-buttonPurple rounded-[10px] p-[24px] mb-auto gap-[20px]">
      {isLoading && <Spinner />}
      <h2 className="font-medium mb-4">Контактна інформація</h2>
      <div className="flex flex-col lg:flex-row gap-[52px] mb-[8px]">
        <BuyTicketInput
          {...register('name', {
            validate: validateName,
          })}
          maxLength={MAX_NAME_LENGTH}
          placeholder="Введіть ім'я"
          id="name"
          htmlFor="name"
          type="text"
          label="Ім'я"
          error={errors?.name?.message}
          width="380"
        />

        <BuyTicketInput
          {...register('surname', {
            validate: validateSurName,
          })}
          placeholder="Введіть прізвище"
          id="surname"
          htmlFor="surname"
          type="text"
          label="Прізвище"
          error={errors?.surname?.message}
          width="380"
        />
      </div>

      <div className="flex flex-col lg:flex-row  gap-[52px] mb-[8px]">
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <BuyTicketInput
              {...field}
              ref={phoneInputRef}
              placeholder="+38(099)999-99-99"
              id="phoneNumber"
              htmlFor="phoneNumber"
              type="tel"
              label="Номер телефону"
              error={errors?.phoneNumber?.message}
              width="380"
            />
          )}
          rules={{
            validate: validatePhoneNumber,
          }}
        />
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
      <label className="flex items-center cursor-pointer mb-[12px]">
        <input
          id="unlimitedTickets"
          type="checkbox"
          className="appearance-none"
          checked={agreement}
          onChange={checkAgreement}
        />
        <div className="h-5 min-w-5 flex items-center justify-center border-[1px] border-buttonPurple">
          {agreement && <MdDone className="text-buttonPurple w-5 h-5" />}
        </div>
        <span className="ml-2">
          Я згоден(а) отримувати рекламну інформацію на мою пошту
        </span>
      </label>

      <div className="flex items-center">
        <div
          className={`flex justify-center items-center border-buttonPurple border-2 rounded-full
            min-w-[24px] h-[24px] text-buttonPurple`}
        >
          <AiOutlineExclamation size={14} />
        </div>
        <span className="ml-2">
          Квитки будуть надіслані вам електронною поштою відразу після оплати
        </span>
      </div>
    </form>
  );
};
