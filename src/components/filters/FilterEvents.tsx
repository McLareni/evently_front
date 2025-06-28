/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { setIsCalendarShown } from '@/redux/filters/filtersSlice';
import {
  getIsCalendarShown,
  getSelectedDates,
  getSelectedPrices,
  getSelectedTypes,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  eventDate,
  eventPrice,
  eventTypes,
} from '@/assets/staticData/statickData';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import { nanoid } from '@reduxjs/toolkit';

import { Checkbox } from '../ui/CheckBox';
import { DateRange } from './DateRange';

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

interface FilterEventsProps {
  addTypeFilter: (filter: string) => void;
  filterEvents: () => void;
  resetFilters: () => void;
  addDateFilter: (filter: string) => void;
  addPriceFilter: (filter: number) => void;
  toggleFilterShown: () => void;
  onClose?: () => void;
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  addTypeFilter,
  filterEvents,
  resetFilters,
  addDateFilter,
  addPriceFilter,
  toggleFilterShown,
  onClose,
}) => {
  const [isShownType, setIsShownType] = useState(true);
  const [isShownDay, setIsShownDay] = useState(true);
  const [isShownPrice, setIsShownPrice] = useState(true);

  const dispatch = useAppDispatch();

  const { isDesktop, isMobile } = useMediaVariables();

  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const selectedTypes = useAppSelector(getSelectedTypes);
  const selectedDates = useAppSelector(getSelectedDates);
  const selectedPrices = useAppSelector(getSelectedPrices);

  const toggleCalendar = () => {
    dispatch(setIsCalendarShown(!isShownCalendar));
  };

  return (
    <div className="lg:pl-[60px] relative">
      <div
        className={`sticky top-[140px] max-h-[calc(100vh-144px)]
          lg:max-h-[calc(100vh-200px)] lg:w-[312px] border-buttonPurple border-[1px]
          rounded-[20px] flex flex-col gap-[24px] pt-[18px] lg:pr-[5px]`}
      >
        <div className="overflow-y-scroll overscroll-contain">
          <div className="px-[18px]">
            {isMobile && (
              <div className="mb-[16px] flex items-center justify-between">
                <h2>Фільтр</h2>
                <button
                  onClick={onClose}
                  className="w-[32px] flex items-center justify-center focus:outline-none"
                  aria-label="Close Modal"
                >
                  <RxCross2 size={24} />
                </button>
              </div>
            )}
            <div className="mb-[16px] flex items-center justify-between">
              <h2>Тип події</h2>
              {isMobile && (
                <button
                  onClick={() => {
                    setIsShownType(!isShownType);
                  }}
                  className="w-[32px] flex items-center justify-center focus:outline-none"
                >
                  {isShownType ? (
                    <AiOutlineMinus size={24} />
                  ) : (
                    <AiOutlinePlus size={24} />
                  )}
                </button>
              )}
            </div>
            <ul
              className={`flex flex-col gap-[16px] pl-[18px] ${isShownType ? '' : 'h-0 overflow-hidden'}`}
            >
              {eventTypes.map(option => (
                <li key={nanoid()} className="flex gap-4">
                  <Checkbox
                    name="type"
                    value={option.label}
                    onChange={() => addTypeFilter(EventTypes[option.label])}
                    checked={selectedTypes.includes(EventTypes[option.label])}
                    label={option.label}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="px-[18px]">
            <div className="w-full mb-[16px] flex items-center justify-between">
              <h2>Коли</h2>
              {isMobile && (
                <button
                  onClick={() => {
                    setIsShownDay(!isShownDay);
                  }}
                  className="w-[32px] flex items-center justify-center focus:outline-none"
                >
                  {isShownDay ? (
                    <AiOutlineMinus size={24} />
                  ) : (
                    <AiOutlinePlus size={24} />
                  )}
                </button>
              )}
            </div>
            <div className="lg:pl-[18px]">
              {isDesktop && (
                <ul className="flex flex-col gap-[16px] mb-[18px]">
                  {eventDate.map(option => (
                    <li key={nanoid()} className="flex gap-4">
                      <Checkbox
                        name="when"
                        value={option.value}
                        onChange={() => addDateFilter(option.label)}
                        checked={selectedDates.includes(option.label)}
                        label={option.label}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <div
                className={`${isShownDay ? 'border-[1px] mb-[18px]' : 'h-0 overflow-hidden'}  border-buttonPurple rounded-[10px] overflow-hidden 
            lg:w-[245px]`}
              >
                {isDesktop ? (
                  <>
                    <button
                      className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
                      onClick={toggleCalendar}
                    >
                      <span>Обрати дату</span>
                      <BiChevronDown />
                    </button>
                    <DateRange isShownCalendar={isShownCalendar} />
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center gap-[12px] py-[12px] px-[20px]">
                      {eventDate.map(option => (
                        <button
                          className={`${selectedDates.includes(option.label) ? 'bg-lightPurple' : ''}
                          flex items-center border-buttonPurple border-[1px] px-[12px] py-[8px] rounded-[8px]`}
                          key={nanoid()}
                          onClick={() => addDateFilter(option.label)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <DateRange isShownCalendar={true} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-[18px]">
            <div className="w-full mb-[16px] flex items-center justify-between">
              <h2>Ціна</h2>
              {isMobile && (
                <button
                  onClick={() => {
                    setIsShownPrice(!isShownPrice);
                  }}
                  className="w-[32px] flex items-center justify-center focus:outline-none"
                >
                  {isShownPrice ? (
                    <AiOutlineMinus size={24} />
                  ) : (
                    <AiOutlinePlus size={24} />
                  )}
                </button>
              )}
            </div>

            <ul
              className={`${isShownPrice ? '' : 'h-0 overflow-hidden'} flex flex-col gap-[16px] pl-[18px]`}
            >
              {eventPrice.map(option => (
                <li key={nanoid()} className="flex gap-4">
                  <Checkbox
                    name="price"
                    value={option.value}
                    onChange={() => addPriceFilter(option.value)}
                    checked={selectedPrices.includes(option.value)}
                    label={option.label}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`px-[24px] pb-[24px] lg:p-0 lg:border-t-buttonPurple lg:border-t-[1px]
            flex gap-[24px] lg:gap-0 lg:mr-[-5px]`}
        >
          <button
            className={`border-buttonPurple border-[1px] rounded-[15px] lg:rounded-none h-[50px]
              flex justify-center items-center flex-1 focus:outline-none border-r-buttonPurple
              border-r-[1px] lg:border-l-0 lg:border-b-0 lg:border-t-0`}
            onClick={resetFilters}
          >
            Відмінити
          </button>
          <button
            className="h-[50px] flex justify-center rounded-[15px] lg:rounded-none items-center flex-1 focus:outline-none bg-filter-btn-gradient lg:rounded-br-[19px] text-background"
            onClick={() => {
              filterEvents();
              toggleFilterShown();
            }}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};
