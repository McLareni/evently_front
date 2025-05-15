import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle, AiOutlineExclamation } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';

import clsx from 'clsx';

type TicketPriceProps = {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  clearErrors: UseFormClearErrors<CreateEventFormValues>;
  isEdit?: boolean;
  event: Event | undefined;
};

const TicketPrice: React.FC<TicketPriceProps> = ({
  control,
  setValue,
  watch,
  errors,
  clearErrors,
  isEdit = false,
  event,
}) => {
  const freeTickets = watch('freeTickets') as boolean;
  const unlimitedTickets = watch('unlimitedTickets') as boolean;
  const ticketPrice = watch('ticketPrice');
  const numberOfTickets = watch('numberOfTickets');

  const ticketsHasBeenSold = event?.soldTickets !== '0';

  useEffect(() => {
    if (unlimitedTickets) {
      setValue('numberOfTickets', '');
      clearErrors('numberOfTickets');
    } else {
      setValue('numberOfTickets', event?.numberOfTickets.toString() || '');
      clearErrors('numberOfTickets');
    }
    if (freeTickets) {
      setValue('ticketPrice', '');
      clearErrors('ticketPrice');
    } else {
      setValue('ticketPrice', event?.price.toString() || '');
      clearErrors('ticketPrice');
    }
  }, [clearErrors, freeTickets, unlimitedTickets, setValue]);

  return (
    <div className="relative max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-8 pl-8 mb-8">
      {isEdit && ticketsHasBeenSold && (
        <div className="flex gap-2 mb-[10px]">
          <AiOutlineExclamation className="rounded-full border border-error fill-error w-6 h-6" />
          <h3 className="text-error text-base font-normal font-lato">
            Ви не можете змінити вартість та кількість квитків, оскільки вже
            мали продажі
          </h3>
        </div>
      )}
      {isEdit &&
        +numberOfTickets < +(event?.soldTickets || 0) &&
        !unlimitedTickets && (
          <div className="flex gap-2 mb-[10px]">
            <AiOutlineExclamation className="rounded-full border border-error fill-error w-6 h-6" />
            <h3 className="text-error text-base font-normal font-lato">
              Ви не можете кількість квитків, оскільки кількість квитків менша
              ніж у вас вже продано білетів
            </h3>
          </div>
        )}
      {!errors.ticketPrice &&
        !errors.numberOfTickets &&
        (freeTickets || ticketPrice) &&
        (unlimitedTickets || numberOfTickets) && (
          <AiFillCheckCircle
            size={40}
            color="#3BE660"
            style={{ position: 'absolute', right: '8px', top: '8px' }}
          />
        )}
      <span className="pb-4 text-2xl">
        Вартість квитків<span className="star">*</span>
      </span>
      <div className="pb-6">
        {(!isEdit ||
          (isEdit && (event?.soldTickets === '0' || freeTickets))) && (
          <button
            type="button"
            className={`${
              freeTickets
                ? 'bg-lightPurple text-gray-700'
                : 'bg-buttonPurple text-white'
            } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
            onClick={() => {
              setValue('freeTickets', false);
            }}
            disabled={isEdit && event?.soldTickets !== '0'}
          >
            Платні
          </button>
        )}
        {(!isEdit ||
          (isEdit && (event?.soldTickets === '0' || !freeTickets))) && (
          <button
            type="button"
            className={`${
              freeTickets
                ? 'bg-buttonPurple text-white'
                : 'bg-lightPurple text-gray-700'
            } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
            onClick={() => {
              setValue('freeTickets', true);
            }}
            disabled={isEdit && event?.soldTickets !== '0'}
          >
            Безкоштовно
          </button>
        )}
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col">
          <label htmlFor="ticketPrice" className="mb-3">
            Ціна
          </label>
          <div className="relative">
            <FaRegMoneyBillAlt
              color={freeTickets ? '#D0D5D8' : '#000000'}
              className={clsx(
                `absolute top-[13.25px] left-[17.25px] w-6 h-6 `,
                { 'text-uploadBtnBg': isEdit && event?.soldTickets !== '0' }
              )}
            />
            <Controller
              name="ticketPrice"
              control={control}
              rules={{
                validate: {
                  isValid: value =>
                    freeTickets || +value > 0 || 'Невірний формат',
                },
              }}
              render={({ field }) => (
                <div
                  className={`w-[240px] h-[48px] p-[2px] ${freeTickets ? 'bg-[#D0D5D8]' : 'bg-createEventInputBorder'}  rounded-[10px]`}
                >
                  <input
                    {...field}
                    id="ticketPrice"
                    type="number"
                    className={clsx(
                      `outline-none pl-[49px] w-full h-full p-4 rounded-[8px] [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
                      {
                        'text-uploadBtnBg':
                          isEdit && event?.soldTickets !== '0',
                      }
                    )}
                    placeholder="100 ₴"
                    disabled={
                      freeTickets || (isEdit && event?.soldTickets !== '0')
                    }
                  />
                </div>
              )}
            />
            <div className="h-[20px]">
              {errors.ticketPrice && (
                <p className="text-red-500 text-sm">
                  {errors.ticketPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="numberOfTickets" className="mb-3">
            Кількість квитків
          </label>
          <div className="relative">
            <HiOutlineTicket
              color={unlimitedTickets ? '#D0D5D8' : '#000000'}
              className={clsx(
                `absolute top-[13.25px] left-[17.25px] w-6 h-6 `,
                { 'text-uploadBtnBg': isEdit && event?.soldTickets !== '0' }
              )}
            />
            <Controller
              name="numberOfTickets"
              control={control}
              rules={{
                validate: {
                  isValid: value =>
                    unlimitedTickets || +(value || 0) > 0 || 'Невірний формат',
                },
              }}
              disabled={event?.soldTickets !== '0'}
              render={({ field }) => (
                <div
                  className={`w-[240px] h-[48px] p-[2px] ${unlimitedTickets ? 'bg-[#D0D5D8]' : 'bg-createEventInputBorder'}  rounded-[10px]`}
                >
                  <input
                    id="numberOfTickets"
                    {...field}
                    type="number"
                    className={clsx(
                      `outline-none pl-[49px] w-full h-full p-4 rounded-[8px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none`,
                      {
                        'text-uploadBtnBg':
                          isEdit && event?.soldTickets !== '0',
                      }
                    )}
                    placeholder="100"
                    disabled={unlimitedTickets}
                  />
                </div>
              )}
            />
            <div className="h-[20px]">
              {errors.numberOfTickets && (
                <p className="text-red-500 text-sm">
                  {errors.numberOfTickets.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="self-end mb-[32px]">
          <Controller
            name="unlimitedTickets"
            control={control}
            render={({ field }) => (
              <label className="flex items-center cursor-pointer">
                <input
                  id="unlimitedTickets"
                  type="checkbox"
                  className="appearance-none"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  disabled={isEdit && event?.soldTickets !== '0'}
                />
                <div className="h-5 w-5 flex items-center justify-center bg-lightPink rounded-[5px]">
                  {unlimitedTickets && (
                    <MdDone className="text-black w-6 h-6" />
                  )}
                </div>
                <span className="ml-2">Необмежена кількість</span>
              </label>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
