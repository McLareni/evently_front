/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineExclamation } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';

import { getUser, updateUserInfo } from '@/redux/auth/operations';
import { selectIsLoading, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  formatBirthDateFromMask,
  formatPhoneNumberFromMask,
  isValueDate,
} from '@/helpers/userForm/formatFromMask';
import {
  formatBirthDateToMask,
  formatPhoneToMask,
} from '@/helpers/userForm/formatToMask';
import { MAX_NAME_LENGTH, validateName } from '@/utils/validateName';
import { useMask } from '@react-input/mask';

import { ProfileInput } from '../profile/ProfileInput';
import Spinner from '../ui/Spinner';

export const Action2: FC = () => {
  const [agreement, setAgreement] = useState(false);

  const { name, surname, birthdayDate, phoneNumber } =
    useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  const defaultValues: UserInfo = {
    name: name || '',
    surname: surname || '',
    birthdayDate: formatBirthDateToMask(birthdayDate),
    phoneNumber: formatPhoneToMask(phoneNumber),
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
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ mode: 'onChange', defaultValues });

  const SearchChanges = (obj1: UserInfo, obj2: UserInfo) => {
    return {
      ...(obj1.name !== obj2.name && { name: obj2.name }),
      ...(obj1.surname !== obj2.surname && { surname: obj2.surname }),
      ...(obj1.birthdayDate !== obj2.birthdayDate && {
        birthdayDate: formatBirthDateFromMask(obj2.birthdayDate),
      }),
      ...(obj1.phoneNumber !== obj2.phoneNumber && {
        phoneNumber: formatPhoneNumberFromMask(obj2.phoneNumber),
      }),
      ...(obj1.changePassword !== obj2.changePassword && {
        password: obj2.changePassword,
      }),
    };
  };

  const onSubmit: SubmitHandler<UserInfo> = data => {
    // const newObj = SearchChanges(defaultValues, data);
    // if (Object.keys(newObj).length === 0) {
    //   return toast.error('Немає що змінювати');
    // }
    // dispatch(updateUserInfo(newObj));
    // !isLoading && dispatch(getUser());
    console.log(data);
  };

  const checkAgreement = () => {
    setAgreement(!agreement);
  };

  return (
    <form
      className="flex flex-col border-[1px] border-buttonPurple rounded-[10px] p-[16px] mb-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading && <Spinner />}
      <div className="flex gap-[24px] mb-[8px]">
        <ProfileInput
          {...register('name', {
            required: true,
            validate: validateName,
          })}
          maxLength={MAX_NAME_LENGTH}
          placeholder="Ім'я"
          id="name"
          htmlFor="name"
          type="text"
          label="Ім'я"
          error={errors?.name?.message}
          width="380"
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
          width="380"
        />
      </div>

      <div className="flex gap-[24px] mb-[8px]">
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
              width="380"
            />
          )}
          rules={{
            required: false,
            validate: value => {
              if (value.length > 0 && value.length < 10) {
                return 'Введіть дату народження';
              } else if (!isValueDate(value) && value.length !== 0) {
                return 'Невірний формат дати';
              } else if (
                new Date(
                  `${value.slice(6, 11)}-${value.slice(3, 5)}-${value.slice(0, 2)}`
                ) < new Date('1900-01-01')
              ) {
                return 'Введіть правильну дату народження';
              }
              const today = new Date();
              const adulthoodDate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
              );
              if (
                new Date(
                  `${value.slice(6, 11)}-${value.slice(3, 5)}-${value.slice(0, 2)}`
                ) > adulthoodDate
              ) {
                return 'Тобі має бути більше 18 років';
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
            required: false,
            validate: value => {
              if (value.length !== 17 && value.length > 0)
                return 'Введіть номер телефону';

              if (value.length === 17) {
                if (value[4] !== '0' || value[5] === '0') {
                  return 'Введіть дійсний код українських операторів';
                }
                if (value.includes('000-00-00')) {
                  return 'Введіть правильний номер телефону';
                }
              }
            },
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
        <div className="h-5 w-5 flex items-center justify-center bg-lightPink rounded-[5px]">
          {agreement && <MdDone className="text-black w-6 h-6" />}
        </div>
        <span className="ml-2">
          Я згоден(а) отримувати рекламну інформацію на мою пошту
        </span>
      </label>

      <div className="flex items-center">
        <div className="flex justify-center items-center border-buttonPurple border-2 rounded-full w-[24px] h-[24px]  text-buttonPurple">
          <AiOutlineExclamation size={14} />
        </div>
        <span className="ml-2">
          Квитки будуть надіслані вам електронною поштою відразу після оплати
        </span>
      </div>
    </form>
  );
};
