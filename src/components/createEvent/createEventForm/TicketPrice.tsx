import { useEffect, useState } from 'react';
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

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';

import MobileSectionHeader from './MobileSectionHeader';

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

  const { isMobile, isDesktop } = useMediaVariables();
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

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

  const dataIsValid = !!(
    !errors.ticketPrice &&
    !errors.numberOfTickets &&
    (freeTickets || ticketPrice) &&
    (unlimitedTickets || numberOfTickets)
  );

  return (
    <div
      onClick={() =>
        isMobile && !sectionIsOpen ? setSectionIsOpen(true) : () => {}
      }
      className={clsx(
        'relative lg:w-[760px] w-full rounded-[20px] lg:border-2 border border-buttonPurple flex flex-col p-3 lg:py-8 lg:px-8 lg:mb-8 mb-4 overflow-hidden',
        sectionIsOpen || isDesktop ? 'h-auto' : 'h-[56px]'
      )}
    >
      {isMobile && (
        <MobileSectionHeader
          text="Вартість квитка"
          isActive={sectionIsOpen}
          changeActiveSection={() => setSectionIsOpen(false)}
          dataIsValid={dataIsValid}
        />
      )}
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
      {dataIsValid && isDesktop && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      {isDesktop && (
        <span className="pb-4 text-2xl">
          Вартість квитків<span className="star">*</span>
        </span>
      )}
      <div className="lg:pb-6 pb-3">
        {(!isEdit ||
          (isEdit && (event?.soldTickets === '0' || freeTickets))) && (
          <button
            type="button"
            className={`${
              !freeTickets
                ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[white]'
                : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
            } hover:from-[#12C2E9] hover:to-[#C471ED] transition ease-in-out duration-300 focus:outline-none 
            font-normal lg:text-xl text-base lg:rounded-[20px] rounded-[15px] border-[1px] border-borderColor mr-4 l
            g:py-[9px] py-0 lg:px-[18px] px-4 lg:h-12 h-[36px]`}
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
                ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[white]'
                : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
            } hover:from-[#12C2E9] hover:to-[#C471ED] transition ease-in-out duration-300 focus:outline-none 
            font-normal lg:text-xl text-base lg:rounded-[20px] rounded-[15px] border-[1px] border-borderColor mr-4 
            lg:py-[9px] py-0 lg:px-[18px] px-4 lg:h-12 h-[36px]`}
            onClick={() => {
              setValue('freeTickets', true);
            }}
            disabled={isEdit && event?.soldTickets !== '0'}
          >
            Безкоштовно
          </button>
        )}
      </div>
      <div className="flex lg:gap-[16px] gap-[14px] flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="ticketPrice" className="lg:mb-3 mb-[6px]">
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
                  className={`lg:w-[240px] w-[159px] h-[48px] p-[2px] ${freeTickets ? 'bg-[#D0D5D8]' : 'bg-createEventInputBorder'}  lg:rounded-[10px] rounded-[7px]`}
                >
                  <input
                    {...field}
                    id="ticketPrice"
                    type="number"
                    className={clsx(
                      `outline-none pl-[49px] w-full h-full p-4 lg:rounded-[8px] rounded-[5px] [appearance:textfield]
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
            <div className="lg:h-[20px] h-[14px]">
              {errors.ticketPrice && (
                <p className="text-red-500 lg:text-sm text-xs">
                  {errors.ticketPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="numberOfTickets" className="lg:mb-3 mb-[6px]">
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
                    unlimitedTickets || +value > 0 || 'Невірний формат',
                },
              }}
              render={({ field }) => (
                <div
                  className={`lg:w-[240px] w-[158px] h-[48px] p-[2px] ${unlimitedTickets ? 'bg-[#D0D5D8]' : 'bg-createEventInputBorder'} lg:rounded-[10px] rounded-[7px]`}
                >
                  <input
                    id="numberOfTickets"
                    {...field}
                    type="number"
                    min={1}
                    className={clsx(
                      `outline-none pl-[49px] w-full h-full p-4 lg:rounded-[8px] rounded-[5px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
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
            <div className="lg:h-[20px] h-[14px]">
              {errors.numberOfTickets && (
                <p className="text-red-500 lg:text-sm text-xs">
                  {errors.numberOfTickets.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="self-end mb-0 flex-1 min-w-[240px]">
          <Controller
            name="unlimitedTickets"
            control={control}
            render={({ field }) => (
              <label className="flex items-center cursor-pointer">
                <input
                  id="unlimitedTickets"
                  type="checkbox"
                  className="appearance-none absolute opacity-0 pointer-events-none"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  disabled={isEdit && event?.soldTickets !== '0'}
                />
                <div className="lg:h-5 lg:w-5 w-6 h-6 flex items-center justify-center bg-lightPink rounded-[5px]">
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
