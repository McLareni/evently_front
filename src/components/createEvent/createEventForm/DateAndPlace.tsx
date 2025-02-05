/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiFillCheckCircle, AiOutlineCalendar } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';

import { CreateEventCalendar } from './CreateEventCalendar';
import { GoogleMapsInput } from './GoogleMapsInput';

interface DateAndPlaceProps {
  date: string;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (startTime: string) => void;
  handleEndTime: (endTime: string) => void;
  onPlaceChange: (newPlace: EventPlaceWithGps) => void;
  handleEventUrlChange: (eventUrl: string) => void;
  toggleOfflineOnline: (value: boolean) => void;
  isOffline: boolean;
  validateDateTime: boolean;
}

const DateAndPlace = ({
  date,
  handleDateChange,
  handleStartTime,
  handleEndTime,
  onPlaceChange,
  handleEventUrlChange,
  toggleOfflineOnline,
  isOffline,
  validateDateTime,
}: DateAndPlaceProps) => {
  const [startTimeSelect, setStartTimeSelect] = useState(false);
  const [endTimeSelect, setEndTimeSelect] = useState(false);
  const [selectedStartTimeOption, setSelectedStartTimeOption] = useState('');
  const [selectedEndOption, setSelectedEndTimeOption] = useState('');
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const dropdownStartTimeRef = useRef<HTMLDivElement | null>(null);
  const dropdownEndTimeRef = useRef<HTMLDivElement | null>(null);

  const formattedDate = formatDateToDayMonth(date);

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

  const dropdownStartTime = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    handleStartTime(selectedStartTimeOption);
    handleEndTime(selectedEndOption);
  }, [
    handleStartTime,
    handleEndTime,
    selectedStartTimeOption,
    selectedEndOption,
  ]);

  return (
    <div className="relative max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col pt-10 pb-8 px-8 mb-8">
      {validateDateTime && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      <span className="pb-4 text-2xl">
        Дата та час<span className="star">*</span>
      </span>
      <div className="flex gap-4">
        <div className="w-[245px]">
          <span>Дата</span>
          <div
            className="border-2 border-buttonPurple rounded-[10px] overflow-hidden 
                        w-[245px] mb-[18px]"
          >
            <button
              type="button"
              onClick={toggleIsCalendarShown}
              className="flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
            >
              <div className="flex">
                <AiOutlineCalendar size="24px" />
                {date ? (
                  <p className="pl-2">{formattedDate}</p>
                ) : (
                  <p className="pl-2 text-uploadBtnBg">Оберіть дату</p>
                )}
              </div>
              <BiChevronDown />
            </button>
            <div className="">
              {isCalendarShown && (
                <CreateEventCalendar
                  handleDateChange={handleDateChange}
                  toggleIsCalendarShown={toggleIsCalendarShown}
                />
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
              type="button"
              className="flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
              onClick={() => setStartTimeSelect(prev => !prev)}
            >
              <div className="flex">
                <BiTimeFive size="24px" />
                {selectedStartTimeOption ? (
                  <p className="pl-2">{selectedStartTimeOption}</p>
                ) : (
                  <p className="pl-2 text-uploadBtnBg">Оберіть час</p>
                )}
              </div>
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
              type="button"
              className="flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
              onClick={() => setEndTimeSelect(prev => !prev)}
            >
              <div className="flex">
                <BiTimeFive size="24px" />
                {selectedEndOption ? (
                  <p className="pl-2">{selectedEndOption}</p>
                ) : (
                  <p className="pl-2 text-uploadBtnBg">Оберіть час</p>
                )}
              </div>
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
      <span className="pb-4 text-2xl">
        Оберіть формат події<span className="star">*</span>
      </span>
      <div className="pb-6">
        <button
          type="button"
          className={`${
            isOffline
              ? 'bg-buttonPurple text-white'
              : 'bg-lightPurple text-gray-700'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => toggleOfflineOnline(true)}
        >
          Оффлайн
        </button>
        <button
          type="button"
          className={`${
            isOffline
              ? 'bg-lightPurple text-gray-700'
              : 'bg-buttonPurple text-white'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => toggleOfflineOnline(false)}
        >
          Онлайн
        </button>
      </div>
      {isOffline ? (
        <div className="flex flex-col w-full">
          <label id="adress" className="pb-3">
            Адреса
          </label>
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
            <GoogleMapsInput
              className="w-full h-full outline-none"
              placeholder="Адреса проведення"
              onPlaceSelect={place => {
                if (!place || !place.geometry) return;
                const formattedPlace = {
                  formatted: place.formatted_address || '',
                  lat: place.geometry.location?.lat() || 0,
                  lng: place.geometry.location?.lng() || 0,
                  name: place.name || '',
                  city: 'Київ',
                };
                onPlaceChange(formattedPlace);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <label htmlFor="link" className="pb-3">
            Посилання на Zoom або Google Meet
          </label>
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
            <input
              type="text"
              id="link"
              placeholder="https://meet.google.com/..."
              className="outline-none w-full h-full rounded-[8px] p-4 border-buttonPurple"
              onChange={e => {
                handleEventUrlChange(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateAndPlace;
