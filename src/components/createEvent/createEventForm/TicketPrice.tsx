/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { HiOutlineTicket } from 'react-icons/hi';

import { Checkbox } from '@/components/ui/CheckBox';

type TicketPriceProps = {
  price: number | 'Безкоштовно' | 'Ціна';
  onPriceChange: (price: number | 'Безкоштовно' | 'Ціна') => void;
  handleNumberOfTicketsChange: (numberOfTickets: string) => void;
  isUnlimited: boolean;
  toggleIsUnlimited: () => void;
  numberOfTickets: string;
};

const TicketPrice: React.FC<TicketPriceProps> = ({
  price,
  onPriceChange,
  handleNumberOfTicketsChange,
  isUnlimited,
  toggleIsUnlimited,
  numberOfTickets,
}) => {
  const [freeTickets, setFreeTickets] = useState<boolean>(
    price === 'Безкоштовно'
  );
  const [inputValue, setInputValue] = useState<string>(
    price === 'Безкоштовно' ? '' : price.toString()
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setInputValue(value);

    if (value) {
      onPriceChange(+value);
    } else {
      onPriceChange('Ціна');
    }
  };

  useEffect(() => {
    if (freeTickets) {
      onPriceChange('Безкоштовно');
      setInputValue('');
    } else if (!freeTickets && price === 'Безкоштовно') {
      onPriceChange('Ціна');
    } else if (!freeTickets && price !== 'Безкоштовно') {
      onPriceChange(price);
    }
  }, [price, freeTickets, onPriceChange]);

  return (
    <div className="max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-8 pl-8 mb-8">
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
            setFreeTickets(false);
            onPriceChange('Ціна');
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
            setFreeTickets(true);
            onPriceChange('Безкоштовно');
          }}
        >
          Безкоштовно
        </button>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-3">
            Ціна
          </label>
          <input
            id="price"
            type="number"
            className={`outline-none border-2 w-[240px] h-[48px] my-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${freeTickets ? 'border-[#D0D5D8]' : 'border-buttonPurple'}`}
            placeholder="100 ₴"
            onChange={handlePriceChange}
            disabled={freeTickets}
            value={inputValue}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mb-3">
            Кількість квитків
          </label>
          <div className="relative">
            <HiOutlineTicket
              color={isUnlimited ? '#D0D5D8' : '#000000'}
              className={`absolute top-[15.25px] left-[17.25px] w-6 h-6 `}
            />
            <input
              type="number"
              onChange={e => handleNumberOfTicketsChange(e.target.value)}
              className={`outline-none border-2 pl-[49px] w-[240px] h-[48px] my-[2px] mx-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none  ${isUnlimited ? 'border-[#D0D5D8]' : 'border-buttonPurple'}`}
              placeholder="100"
              disabled={isUnlimited}
              value={numberOfTickets}
            />
          </div>
        </div>
        <div className="self-end mb-[16px]">
          <Checkbox
            label="Необмежена кількість "
            name="type"
            onChange={toggleIsUnlimited}
            checked={isUnlimited}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
