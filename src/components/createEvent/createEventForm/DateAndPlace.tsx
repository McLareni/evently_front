/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';

import { CreateEventCalendar } from './CreateEventCalendar';
import { GoogleMapsInput } from './GoogleMapsInput';

interface DateAndPlaceProps {
  handleDateChange: (newDate: string) => void;
}

const DateAndPlace = ({ handleDateChange }: DateAndPlaceProps) => {
  const [startTimeSelect, setStartTimeSelect] = useState<boolean>(false);
  const [endTimeSelect, setEndTimeSelect] = useState<boolean>(false);
  const [startTimeOption, setSelectedStartTimeOption] = useState<string>('');
  const [selectedEndOption, setSelectedEndTimeOption] = useState<string>('');
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isCalendarShown, setIsCalendarShown] = useState(false);

  const [eventType, setEventType] = useState<boolean>(true);

  const dropdownStartTimeRef = useRef<HTMLDivElement | null>(null);
  const dropdownEndTimeRef = useRef<HTMLDivElement | null>(null);

  const { control, setValue } = useForm({
    mode: 'onChange',
  });

  const handleStartTimeOption = (option: string) => {
    setSelectedStartTimeOption(option);
    setStartTimeSelect(false);
  };
  const handleEndTimeOption = (option: string) => {
    setSelectedEndTimeOption(option);
    setEndTimeSelect(false);
  };

  const toggleIsCalendarShown = () => {
    setIsCalendarShown(!isCalendarShown);
  };

  const dropdownStartTime = useRef<HTMLDivElement | null>(null); // Ссылка для первого селектора
  const dropdownEndTime = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownStartTime.current &&
      !dropdownStartTime.current.contains(event.target as Node)
    ) {
      setStartTimeSelect(false);
    }
    if (
      dropdownEndTime.current &&
      !dropdownEndTime.current.contains(event.target as Node)
    ) {
      setEndTimeSelect(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const generateTimeOptions = () => {
      const startTime = 5 * 60; // 05:00 in minutes
      const endTime = 24 * 60; // 00:00 in minutes (next day)
      const interval = 15; // Interval in minutes

      const times = [];
      for (let minutes = startTime; minutes < endTime; minutes += interval) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        times.push({ label: time, value: time });
      }

      return times;
    };

    const generatedOptions = generateTimeOptions();
    setOptions(generatedOptions);
  }, []);

  return (
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col pt-10 pb-5 px-10 mb-8">
      <span className="pb-4 text-2xl">Дата та час</span>
      <div className="flex gap-4">
        <div className="w-[245px]">
          <span>Дата</span>
          <div
            className="border-2 border-buttonPurple rounded-[10px] overflow-hidden 
                        w-[245px] mb-[18px]"
          >
            <button
              onClick={toggleIsCalendarShown}
              className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
            >
              <AiOutlineCalendar size="24px" />
              <BiChevronDown />
            </button>
            <div className="">
              {isCalendarShown && (
                <CreateEventCalendar handleDateChange={handleDateChange} />
              )}
            </div>
          </div>
        </div>
        <div>
          <span>Початок</span>
          <div
            ref={dropdownStartTimeRef}
            className="border-2 border-buttonPurple rounded-[10px] overflow-hidden 
                        w-[210px] max-h-[230px] mb-[18px]"
          >
            <button
              className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
              onClick={() => setStartTimeSelect(prev => !prev)}
            >
              <BiTimeFive size="24px" />
              {startTimeOption}
              <BiChevronDown />
            </button>
            {startTimeSelect && (
              <ul
                className="w-[210px] border-buttonPurple
                pl-[10px] pt-[12px] pr-[20px] h-[215px] overflow-auto border-t-2 bg-background"
              >
                {options.map(option => (
                  <li
                    onClick={() => handleStartTimeOption(option.label)}
                    className="cursor-pointer h-[31px] pt-[4px] pl-[5px] rounded-[10px] hover:bg-lightPurple ease-in-out duration-500"
                    key={option.value}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <span>Кінець</span>
          <div
            ref={dropdownEndTimeRef}
            className="inline-block border-2 border-buttonPurple rounded-[10px] overflow-hidden w-[210px] max-h-[230px] mb-[18px] "
          >
            <button
              className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
              onClick={() => setEndTimeSelect(prev => !prev)}
            >
              <BiTimeFive size="24px" />
              {selectedEndOption}
              <BiChevronDown />
            </button>
            {endTimeSelect && (
              <ul
                className=" w-[210px] border-buttonPurple pl-[10px] pt-[10px] pr-[20px] h-[215px] 
                border-buttonPurple border-0 overflow-auto border-t-2 bg-background"
              >
                {options.map(option => (
                  <li
                    onClick={() => handleEndTimeOption(option.label)}
                    className="cursor-pointer h-[31px] pt-[4px] pl-[5px] rounded-[10px] hover:bg-lightPurple ease-in-out duration-500"
                    key={option.value}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <span className="pb-4 text-2xl">Оберіть формат події</span>
      <div className="pb-6">
        <button
          className={`${
            eventType
              ? 'bg-buttonPurple text-white'
              : 'bg-lightPurple text-gray-700'
          }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => setEventType(true)}
        >
          Оффлайн
        </button>
        <button
          className={`${
            eventType
              ? 'bg-lightPurple text-gray-700'
              : 'bg-buttonPurple text-white'
          }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => setEventType(false)}
        >
          Онлайн
        </button>
      </div>
      {eventType ? (
        <div className="flex">
          <div className="flex flex-col">
            <label id="adress" className="pb-3">
              Адреса
            </label>
            <Controller
              name="address"
              control={control}
              defaultValue={{
                formatted: '',
                lat: 0,
                lng: 0,
                name: '',
                city: 'Київ',
              }}
              render={({ field }) => (
                <GoogleMapsInput
                  className="w-[696px] border-buttonPurple"
                  onPlaceSelect={place => {
                    if (!place || !place.geometry) return;
                    const formattedPlace = {
                      formatted: place.formatted_address || '',
                      lat: place.geometry.location?.lat() || 0,
                      lng: place.geometry.location?.lng() || 0,
                      name: place.name || '',
                      city: 'Київ',
                    };
                    setValue('address', formattedPlace);
                    field.onChange(formattedPlace);
                  }}
                />
              )}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col  pr-4">
          <label htmlFor="link" className="pb-3">
            Посилання на Zoom або Google Meet
          </label>
          <input
            type="text"
            id="link"
            placeholder="https://meet.google.com/..."
            className="w-[696px] h-[52px] border-2 rounded-[10px] p-4 border-buttonPurple"
          />
        </div>
      )}
    </div>
  );
};

export default DateAndPlace;
