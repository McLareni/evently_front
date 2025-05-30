import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const CITIES = ['Київ', 'Львів', 'Одеса', 'Харків'];

interface IProps {
  isOpen: boolean;
  close: () => void;
}

const CityPicker: React.FC<IProps> = ({ isOpen, close }) => {
  const [currentCity, setCurrentCity] = useState('');

  return (
    <div
      className={`absolute transition-all duration-150 flex flex-col w-full bg-hoverCard 
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
      {CITIES.map(city => (
        <button
          key={city}
          onClick={() => setCurrentCity(city)}
          className={`${currentCity === city ? 'font-bold' : 'font-normal'} focus:outline-none py-[14px] text-base leading-[19px]`}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default CityPicker;
