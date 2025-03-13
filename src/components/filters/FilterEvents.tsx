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
  // eslint-disable-next-line no-unused-vars
  addTypeFilter: (filter: string) => void;
  filterEvents: () => void;
  resetFilters: () => void;
  // eslint-disable-next-line no-unused-vars
  addDateFilter: (filter: string) => void;
  // eslint-disable-next-line no-unused-vars
  addPriceFilter: (filter: number) => void;
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  addTypeFilter,
  filterEvents,
  resetFilters,
  addDateFilter,
  addPriceFilter,
}) => {
  const dispatch = useAppDispatch();

  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const selectedTypes = useAppSelector(getSelectedTypes);
  const selectedDates = useAppSelector(getSelectedDates);
  const selectedPrices = useAppSelector(getSelectedPrices);

  const toggleCalendar = () => {
    dispatch(setIsCalendarShown(!isShownCalendar));
  };

  return (
    <div className="pl-[60px] relative">
      <div
        className="sticky top-[150px] max-h-[calc(100vh-200px)] w-[312px] border-buttonPurple border-[1px]
      rounded-[20px] flex flex-col gap-[24px] pt-[18px] pr-[5px]"
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
            <div className="pl-[18px]">
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
              <div
                className="border-[1px] border-buttonPurple rounded-[10px] overflow-hidden 
            w-[245px] mb-[18px]"
              >
                <button
                  className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
                  onClick={toggleCalendar}
                >
                  <span>Обрати дату</span>
                  <BiChevronDown />
                </button>
                <DateRange isShownCalendar={isShownCalendar} />
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

        <div className="border-t-buttonPurple border-t-[1px] flex mr-[-5px]">
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none border-r-buttonPurple border-r-[1px]"
            onClick={resetFilters}
          >
            Відмінити
          </button>
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none bg-filter-btn-gradient rounded-br-[19px] text-background"
            onClick={filterEvents}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};
