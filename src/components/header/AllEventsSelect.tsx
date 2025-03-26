import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import {
  setFirstRender,
  setOneFilterType,
} from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

interface AllEventsSelectProps {
  options: Option[];
  label: string;
  className?: string;
  dropdownWidth?: string;
  buttonWidth?: string;
}

const EventTypes: Record<string, string> = {
  'Усі події': 'ALL_EVENTS',
  Інше: 'OTHER',
  'Спортивні заходи': 'SPORTS_EVENTS',
  'Бізнес та нетворкінг': 'BUSINESS_NETWORKING',
  'Майстер класи': 'MASTER_CLASS',
  Концерти: 'CONCERTS',
  'Під домом': 'UNDER_HOUSE',
  'Stand-up': 'STAND_UP',
  Популярні: 'POPULAR',
};

export const AllEventsSelect: React.FC<AllEventsSelectProps> = ({
  options,
  label,
  className,
  dropdownWidth = '60px',
  buttonWidth = '54px',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    dispatch(setFirstRender(false));
    dispatch(setOneFilterType(EventTypes[value]));
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
        } relative inline-flex justify-center items-center rounded-md px-2 py-1 bg-background text-sm text-gray-700 
         focus:outline-none ${className}`}
        style={{ width: buttonWidth }}
        onMouseEnter={() => setIsOpen(true)}
        
      >
        <span className=" text-base">{label}</span>
        <IoIosArrowDown
          className={`absolute right-[-7px] w-[12px] h-[12px] inline-block mt-[2px] ml-1 transition-transform duration-200 ease-in-out ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-[20px] shadow-lg bg-background 
          border-solid border-[1px] border-buttonPurple ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          style={{ width: dropdownWidth }}
        >
          <div className="py-1">
            {options.map(option => (
              <NavLink
                key={option.value}
                to="/all_events"
                onClick={() => handleClick(option.label)}
                className="border-none block w-full mt-3 mb-3 text-left px-4  py-2 
                text-black active:text-buttonPurple hover:font-bold cursor-pointer"
              >
                {option.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
