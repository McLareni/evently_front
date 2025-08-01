import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import {
  AiFillCheckCircle,
  AiOutlineCalendar,
  AiOutlineExclamation,
} from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { CreateEventCalendar } from './CreateEventCalendar';
import MobileSectionHeader from './MobileSectionHeader';
import { OnlineOffline } from './OnlineOffline';

interface DateAndPlaceProps {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  trigger: UseFormTrigger<CreateEventFormValues>;
  isEdit?: boolean;
}

const DateAndPlace = ({
  control,
  setValue,
  watch,
  errors,
  trigger,
  isEdit,
}: DateAndPlaceProps) => {
  const [startTimeSelect, setStartTimeSelect] = useState(false);
  const [endTimeSelect, setEndTimeSelect] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

  const { isMobile, isDesktop } = useMediaVariables();

  const date = watch('date');
  const { day, time, endTime } = date;

  const daySelected = day.length > 0;
  const startSelected = time.length > 0;
  const endSelected = endTime.length > 0;

  const formattedDate = formatDateToDayMonth(date.day);

  const getDateDifference = () => {
    return dayjs(day).diff(dayjs(new Date()).format('YYYY-MM-DD'), 'day');
  };

  const dateDifference = getDateDifference();

  const startTimeToNumber = +time.replace(':', '');
  const endTimeToNumber = +endTime.replace(':', '');
  const currentTimeToNumber = +dayjs(new Date())
    .format('HH:mm')
    .replace(':', '');

  const filterStartTimeOptions = () => {
    if (dateDifference === 0) {
      const filteredArray = options.filter(
        item => +item.replace(':', '') > currentTimeToNumber
      );

      return filteredArray;
    } else {
      return options;
    }
  };

  const filteredStartTimeOptions = filterStartTimeOptions();

  const filterEndTimeOptions = () => {
    const filteredArray = options.filter(
      item => +item.replace(':', '') > startTimeToNumber
    );

    return filteredArray;
  };

  const filteredEndTimeOptions = filterEndTimeOptions();

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
        times.push(time);
      }

      return times;
    };

    const generatedOptions = generateTimeOptions();
    setOptions(generatedOptions);
  }, []);

  useEffect(() => {
    if (endTimeToNumber <= startTimeToNumber) {
      setValue('date.endTime', '');
    }
  }, [endTimeToNumber, setValue, startTimeToNumber]);

  useEffect(() => {
    if (dateDifference < 0) {
      setValue('date.day', '');
    }
  }, [dateDifference, setValue]);

  useEffect(() => {
    if (dateDifference === 0 && startTimeToNumber < currentTimeToNumber) {
      setValue('date.time', '');
    }
  }, [currentTimeToNumber, dateDifference, setValue, startTimeToNumber]);

  
  const isValidDate = !!(
    daySelected &&
        startSelected &&
        endSelected &&
        validatedOnlineOffline
  );

  return (
    <div
      onClick={() =>
        isMobile && !sectionIsOpen ? setSectionIsOpen(true) : () => {}
      }
      className={clsx(
        'relative lg:w-[760px] w-full rounded-[20px] lg:border-2 border border-buttonPurple flex flex-col p-3 lg:pt-10 lg:pb-8 lg:px-8 lg:mb-8 mb-4 overflow-hidden',
        sectionIsOpen || !isMobile ? 'h-auto' : 'h-[56px]'
      )}
    >
      {isMobile && (
        <MobileSectionHeader
          text="Дата та час"
          isActive={sectionIsOpen}
          changeActiveSection={() => setSectionIsOpen(false)}
          dataIsValid={isValidDate}
        />
      )}
      {isEdit && (
        <div className="flex gap-2 mb-[10px]">
          <AiOutlineExclamation className="rounded-full border border-error fill-error w-6 h-6" />
          <h3 className="text-error text-base font-normal font-lato">
            Ви не можете змінити дату, час або адресу події
          </h3>
        </div>
      )}
      {isValidDate && isDesktop && (
          <AiFillCheckCircle
            size={40}
            color="#3BE660"
            style={{ position: 'absolute', right: '8px', top: '8px' }}
          />
        )}
      {!isMobile && (
        <span className="lg:pb-4 pb-0 lg:text-2xl text-base">
          Дата та час<span className="star">*</span>
        </span>
      )}
      <div className="flex gap-4 flex-wrap lg:mb-[18px] mb-3">
        <div className="flex-1 min-w-56 lg:min-w-[241px]">
          <span>Дата</span>
          {isMobile && <span className="star">*</span>}
          <div className="lg:w-[245px] w-full p-[2px] bg-createEventInputBorder lg:rounded-[10px] rounded-[7px] mt-3">
            <div
              ref={dropdownDate}
              className="overflow-hidden lg:rounded-[8px] rounded-[5px]"
            >
              <button
                type="button"
                onClick={toggleIsCalendarShown}
                className="bg-background flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
                disabled={isEdit}
              >
                <div className="flex">
                  <AiOutlineCalendar
                    size="24px"
                    className={clsx({ 'fill-uploadBtnBg': isEdit })}
                  />
                  {date.day.length > 0 ? (
                    <p className={clsx('pl-2', { 'text-uploadBtnBg': isEdit })}>
                      {formattedDate}
                    </p>
                  ) : (
                    <p className="pl-2 text-uploadBtnBg">Обери дату</p>
                  )}
                </div>
                <BiChevronDown
                  className={clsx({ 'fill-uploadBtnBg': isEdit })}
                />
              </button>
              {isCalendarShown && (
                <div className="w-full h-[2px] bg-transparent" />
              )}
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
        </div>
        <div className="flex-1 min-w-[157px] lg:min-w-[209px]">
          <span>Початок</span>
          {isMobile && <span className="star">*</span>}
          <div className="lg:w-[210px] w-full p-[2px] bg-createEventInputBorder lg:rounded-[10px] rounded-[7px] mt-3">
            <div
              ref={dropdownStartTime}
              className="lg:rounded-[8px] rounded-[5px] overflow-hidden w-full max-h-[230px]"
            >
              <button
                type="button"
                className="bg-background flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
                onClick={() => setStartTimeSelect(prev => !prev)}
                disabled={isEdit}
              >
                <div className="flex">
                  <BiTimeFive
                    size="24px"
                    className={clsx({ 'fill-uploadBtnBg': isEdit })}
                  />
                  {startSelected ? (
                    <p className={clsx('pl-2', { 'text-uploadBtnBg': isEdit })}>
                      {date.time}
                    </p>
                  ) : (
                    <p className="pl-2 text-uploadBtnBg">Обери час</p>
                  )}
                </div>
                <BiChevronDown
                  className={clsx({ 'fill-uploadBtnBg': isEdit })}
                />
              </button>
              {startTimeSelect && (
                <div className="w-full h-[2px] bg-transparent" />
              )}
              {startTimeSelect && (
                <ul
                  className="w-[210px] border-buttonPurple
                pl-[10px] pt-[12px] pr-[20px] h-[215px] overflow-auto bg-background"
                >
                  {filteredStartTimeOptions.map(option => (
                    <li
                      onClick={() => {
                        setValue('date.time', option);
                        setStartTimeSelect(false);
                      }}
                      className="cursor-pointer h-[31px] pt-[4px] pl-[5px] rounded-[10px] hover:bg-lightPurple ease-in-out duration-500"
                      key={option}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[157px] lg:min-w-[209px]">
          <span>Кінець</span>
          {isMobile && <span className="star">*</span>}
          <div className="lg:w-[210px] w-full p-[2px] bg-createEventInputBorder lg:rounded-[10px] rounded-[7px] mt-3">
            <div
              ref={dropdownEndTime}
              className="lg:rounded-[8px] rounded-[5px] overflow-hidden w-full max-h-[230px]"
            >
              <button
                type="button"
                className="bg-background flex justify-between items-center w-full h-[52px] px-[12px] focus:outline-none"
                onClick={() => setEndTimeSelect(prev => !prev)}
                disabled={isEdit}
              >
                <div className="flex">
                  <BiTimeFive
                    size="24px"
                    className={clsx({ 'fill-uploadBtnBg': isEdit })}
                  />
                  {endSelected ? (
                    <p className={clsx('pl-2', { 'text-uploadBtnBg': isEdit })}>
                      {date.endTime}
                    </p>
                  ) : (
                    <p className="pl-2 text-uploadBtnBg">Обери час</p>
                  )}
                </div>
                <BiChevronDown
                  className={clsx({ 'fill-uploadBtnBg': isEdit })}
                />
              </button>
              {endTimeSelect && (
                <div className="w-full h-[2px] bg-transparent" />
              )}
              {endTimeSelect && (
                <ul className=" w-[210px] border-buttonPurple pl-[10px] pt-[10px] pr-[20px] h-[215px] overflow-auto bg-background">
                  {filteredEndTimeOptions.map(option => (
                    <li
                      onClick={() => {
                        setValue('date.endTime', option);
                        setEndTimeSelect(false);
                      }}
                      className="cursor-pointer h-[31px] pt-[4px] pl-[5px] rounded-[10px] hover:bg-lightPurple ease-in-out duration-500"
                      key={option}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <OnlineOffline
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
        isEdit={isEdit}
      />
    </div>
  );
};

export default DateAndPlace;
