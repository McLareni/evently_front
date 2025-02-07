import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';

type TicketPriceProps = {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  clearErrors: UseFormClearErrors<CreateEventFormValues>;
};

const TicketPrice: React.FC<TicketPriceProps> = ({
  control,
  setValue,
  watch,
  errors,
  clearErrors,
}) => {
  const freeTickets = watch('freeTickets') as boolean;
  const unlimitedTickets = watch('unlimitedTickets') as boolean;
  const ticketPrice = watch('ticketPrice');
  const numberOfTickets = watch('numberOfTickets');

  const setIsUnlimited = () => {
    setValue('unlimitedTickets', !unlimitedTickets);
  };

  useEffect(() => {
    if (unlimitedTickets) {
      setValue('numberOfTickets', '');
      clearErrors('numberOfTickets');
    }
    if (freeTickets) {
      setValue('ticketPrice', '');
      clearErrors('ticketPrice');
    }
  }, [clearErrors, freeTickets, unlimitedTickets, setValue]);

  return (
    <div className="relative max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-8 pl-8 mb-8">
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
        >
          Платні
        </button>
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
        >
          Безкоштовно
        </button>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col">
          <label htmlFor="ticketPrice" className="mb-3">
            Ціна
          </label>
          <Controller
            name="ticketPrice"
            control={control}
            rules={{
              // required: "Опис обов'язковий",
              validate: {
                isValid: value =>
                  freeTickets || +value > 0 || 'Невірний формат',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="ticketPrice"
                type="number"
                className={`outline-none border-2 w-[240px] h-[48px] my-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${freeTickets ? 'border-[#D0D5D8]' : 'border-buttonPurple'}`}
                placeholder="100 ₴"
                disabled={freeTickets}
              />
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

        <div className="flex flex-col">
          <label htmlFor="" className="mb-3">
            Кількість квитків
          </label>
          <div className="relative">
            <HiOutlineTicket
              color={unlimitedTickets ? '#D0D5D8' : '#000000'}
              className={`absolute top-[15.25px] left-[17.25px] w-6 h-6 `}
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
                <input
                  {...field}
                  type="number"
                  className={`outline-none border-2 pl-[49px] w-[240px] h-[48px] my-[2px] mx-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none  ${unlimitedTickets ? 'border-[#D0D5D8]' : 'border-buttonPurple'}`}
                  placeholder="100"
                  disabled={unlimitedTickets}
                />
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
        <div className="self-end mb-[20px]">
          <Controller
            name="unlimitedTickets"
            control={control}
            render={({ field }) => (
              <label className="flex items-center cursor-pointer">
                <input
                  id="unlimitedTickets"
                  onClick={setIsUnlimited}
                  type="checkbox"
                  className="appearance-none"
                  {...field}
                  checked={unlimitedTickets}
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
