import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { setCity } from '@/redux/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { cityOptions } from '@/assets/staticData/statickData';

interface IProps {
  isOpen: boolean;
  close: () => void;
}

const CityPicker: React.FC<IProps> = ({ isOpen, close }) => {
  const defaultCity = useAppSelector(state => state.filter.city);
  const [currentCity, setCurrentCity] = useState(defaultCity || 'Всі міста');
  const dispatch = useAppDispatch();

  const handleClick = (city: string) => {
    setCurrentCity(city);
    dispatch(setCity(city));
  };

  return (
    <div
      className={`absolute top-[73px] transition-all duration-150 flex flex-col w-full bg-hoverCard
        overflow-hidden ${isOpen ? 'h-[263px] p-4' : 'h-0 p-0'}`}
    >
      <div className="relative text-center mb-[9px]">
        <h2 className="text-xl leading-[30px]">Оберіть місто</h2>
        <button
          className="focus:outline-none absolute right-3 top-0"
          onClick={close}
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>
      </div>
      <div className="overflow-y-scroll w-full bg-hoverCard p-0">
        {cityOptions.map(city => (
          <button
            key={city}
            onClick={() => handleClick(city)}
            className={`${currentCity === city ? 'font-bold' : 'font-normal'} focus:outline-none py-[14px] w-full  text-base leading-[19px]`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityPicker;
