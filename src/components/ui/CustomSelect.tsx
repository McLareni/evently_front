import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { setCity } from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

import { nanoid } from '@reduxjs/toolkit';

interface IEventSelectProps {
  options: string[];
  selectedOptionProp: string;
  label?: string;
  className?: string;
  dropdownWidth?: string;
  buttonWidth?: string;
  replaceLabelOnSelect?: boolean;
}

const CustomSelect: React.FC<IEventSelectProps> = ({
  options,
  selectedOptionProp,
  label = '',
  className,
  dropdownWidth = '60px',
  buttonWidth = '62px',
  replaceLabelOnSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedOptionProp
  );

  const dispatch = useAppDispatch();

  const handleClick = (option: string) => {
    if (replaceLabelOnSelect) {
      setSelectedOption(option);
      dispatch(setCity(option));
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="z-30  relative inline-block text-left border-buttonPurple  "
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${
          isOpen
            ? 'font-bold text-buttonPurple hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_0.5)]'
            : 'text-gray-700'
        } inline-flex justify-center items-center rounded-md px-2 py-1 bg-background text-sm text-gray-700 
         focus:outline-none relative ${className}`}
        // onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        style={{ width: buttonWidth }}
      >
        <span className=" text-base">
          {replaceLabelOnSelect && selectedOption ? selectedOption : label}
        </span>
        <IoIosArrowDown
          className={`absolute right-[-7px] w-[12px] h-[12px] inline-block mt-[2px] ml-1 transition-transform duration-200 ease-in-out ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="origin-top absolute left-1/2 transform -translate-x-1/2 pt-1 rounded-[20px] shadow-lg bg-background 
          border-solid border-[1px] border-buttonPurple ring-1 ring-black ring-opacity-5 focus:outline-none z-10 h-80 overflow-scroll"
          style={{ width: dropdownWidth }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            {options.map(option => (
              <button
                className="border-none block w-full mt-3 mb-3 text-left px-4  py-2 
                  text-black active:text-buttonPurple hover:font-bold cursor-pointer focus:outline-none"
                key={nanoid()}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
