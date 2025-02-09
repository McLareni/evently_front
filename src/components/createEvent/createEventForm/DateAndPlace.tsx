import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle, AiOutlineCalendar } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';

import { CreateEventCalendar } from './CreateEventCalendar';
import { OnlineOffline } from './OnlineOffline';

interface DateAndPlaceProps {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  trigger: UseFormTrigger<CreateEventFormValues>;
}

const DateAndPlace = ({
  control,
  setValue,
  watch,
  errors,
  trigger,
}: DateAndPlaceProps) => {
  const [startTimeSelect, setStartTimeSelect] = useState(false);
  const [endTimeSelect, setEndTimeSelect] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isCalendarShown, setIsCalendarShown] = useState(false);

  const date = watch('date');
  const daySelected = date.day.length > 0;
  const startSelected = date.time.length > 0;
  const endSelected = date.endTime.length > 0;

  const formattedDate = formatDateToDayMonth(date.day);

  const toggleIsCalendarShown = () => {
    setIsCalendarShown(!isCalendarShown);
  };

  const handleDateChange = (newDate: string) => {
    setValue('date.day', newDate);
  };

  const isOffline = watch('isOffline');
  const location = watch('location');
  const eventUrl = watch('eventUrl');

  const validateOnlineOffline = () => {
    if (isOffline && location.city.length > 0) return true;
    if (!isOffline && eventUrl.length > 0) return true;
    return false;
  };
  const validatedOnlineOffline = validateOnlineOffline();

  const dropdownDate = useRef<HTMLDivElement | null>(null);
  const dropdownStartTime = useRef<HTMLDivElement | null>(null);
  const dropdownEndTime = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownDate.current &&
      !dropdownDate.current.contains(event.target as Node)
    ) {
      setIsCalendarShown(false);
    }
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
    <div className="relative max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col pt-10 pb-8 px-8 mb-8">
      {daySelected &&
        startSelected &&
        endSelected &&
        validatedOnlineOffline && (
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
            ref={dropdownDate}
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
                {date.day.length > 0 ? (
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
            ref={dropdownStartTime}
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
                {startSelected ? (
                  <p className="pl-2">{date.time}</p>
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
                    onClick={() => {
                      setValue('date.time', option.label);
                      setStartTimeSelect(false);
                    }}
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
            ref={dropdownEndTime}
            className="inline-block border-2 border-buttonPurple rounded-[10px] overflow-hidden w-[210px] max-h-[230px] mb-[18px] "
          >
            <button
              type="button"
              className="flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
              onClick={() => setEndTimeSelect(prev => !prev)}
            >
              <div className="flex">
                <BiTimeFive size="24px" />
                {endSelected ? (
                  <p className="pl-2">{date.endTime}</p>
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
                    onClick={() => {
                      setValue('date.endTime', option.label);
                      setEndTimeSelect(false);
                    }}
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
      <OnlineOffline
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
      />
    </div>
  );
};

export default DateAndPlace;
