/* eslint-disable no-unused-vars */
import { BiChevronDown } from 'react-icons/bi';

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
import { useScreenWidth } from '@/hooks/useScreenWidth';
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
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  addTypeFilter,
  filterEvents,
  resetFilters,
  addDateFilter,
  addPriceFilter,
  toggleFilterShown,
}) => {
  const dispatch = useAppDispatch();

  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const selectedTypes = useAppSelector(getSelectedTypes);
  const selectedDates = useAppSelector(getSelectedDates);
  const selectedPrices = useAppSelector(getSelectedPrices);

  const width = useScreenWidth();

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
            <h2 className="mb-[16px]">Тип події</h2>
            <ul className="flex flex-col gap-[16px] pl-[18px]">
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
            <h2 className="mb-[16px]">Коли</h2>
            <div className="lg:pl-[18px]">
              {width > 1024 && (
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
                className="border-[1px] border-buttonPurple rounded-[10px] overflow-hidden 
            lg:w-[245px] mb-[18px]"
              >
                {width >= 1024 ? (
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
                          className="flex items-center border-buttonPurple border-[1px] px-[12px] py-[8px] rounded-[8px]"
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
            <h2 className="mb-[16px]">Ціна</h2>
            <ul className="flex flex-col gap-[16px] pl-[18px]">
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

        <div className="border-t-buttonPurple border-t-[1px] flex lg:mr-[-5px]">
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none border-r-buttonPurple border-r-[1px]"
            onClick={resetFilters}
          >
            Відмінити
          </button>
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none bg-filter-btn-gradient rounded-br-[19px] text-background"
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
