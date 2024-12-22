

import { SharedBtn } from '@/components/ui';
import { useEffect, useState } from 'react';
// import { register } from 'module';
// import { useForm } from 'react-hook-form';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';

const categories: { name: string }[] = [
  { name: 'Концерт' },
  { name: 'Майстер клас' },
  { name: 'Спортивний захід' },
  { name: 'Stand-up' },
  { name: 'Бізнес та нетворкінг' },
  { name: 'Інше' },
];



type FormProps = {
  eventName: string;
  price: string;
  // onCategorieChange: (categorie: string) => void;
  onEventNameChange: (eventName: string) => void;
  // onDateChange: (data: string) => void;
  // onPlaceChange: (place: string) => void;
  onPriceChange: (price: string) => void;
};
// { name, description, onNameChange, onDescriptionChange }
const EventForm: React.FC<FormProps> = ({
  eventName,
  price,
  onEventNameChange,
  onPriceChange,
}) => {
  const [startDaySelect, setstartDaySelect] = useState<boolean>(false);
  const [endDaySelect, setendDaySelect] = useState<boolean>(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [ticketsType, setTicketsType] = useState<boolean>(true)
  const [eventType, setEventType] = useState<boolean>(true);
  


  const handleClickOutside = () => {
    setstartDaySelect(false);
    setendDaySelect(false);
  };
  useEffect(() => {
    if (eventName === '') {
      onEventNameChange('Назва події');
    }
  }, [eventName, onEventNameChange]);
  useEffect(() => {
    if (price === '') {
      onPriceChange('Назва події');
    }
  }, [price, onPriceChange]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <>
      <div className="">
        <div className="w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
          <div>
            <div className="relative">
              <input type="file" />
              <p></p>
            </div>
            <p></p>
          </div>
          <div>
            <div className="relative">
              <img src="" alt="" />
              <p></p>
            </div>
            <p></p>
          </div>
          <div>
            <div className="relative">
              <img src="" alt="" />
              <p></p>
            </div>
            <p></p>
          </div>
        </div>
        <div className="w-[760px] h-[553px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10 mb-8">
          <div className="flex flex-col pb-6">
            <label className="pb-3 text-2xl">Назва події</label>
            {/*  bg-gradient-to-br from-[#9B8FF3] to-[#38F6F9] */}
            <input
              type="text"
              className="w-[679px] h-[52px] p-4 border-2 rounded-[10px] "
              placeholder="Назви подію так, щоб людям було одразу зрозуміло, про що вона"
              onChange={e => onEventNameChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col pb-[42px]">
            <label htmlFor="" className="pb-4 text-2xl">
              Опис
            </label>
            <textarea
              className="w-[679px] h-[128px] p-4 border-2 rounded-[10px]"
              name=""
              id=""
              placeholder="Коротко опиши ідею та концепцію події"
            ></textarea>
          </div>
          <div>
            <div className="flex flex-col">
              <span className="pb-4 text-2xl">Категорія</span>
              <div className="flex break-words w-[669px] h-[112px] flex-wrap">
                {categories.map(categorie => (
                  <div
                    className="cursor-pointer flex items-center rounded-[20px] border-[1px] border-borderColor text-xl mr-4 last:pr-0 h-12 px-[18px] 
                            min-w-[80px] max-w-[223px] bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]"
                  >
                    {categorie.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[760px] h-[413px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10 mb-8">
          <span className="pb-4 text-2xl">Дата та час</span>
          <div className="flex gap-4">
            <div className="w-[245px]">
              <span>Дата</span>
              <div
                className="border-2 border-buttonPurple rounded-[10px] overflow-hidden 
                        w-[245px] mb-[18px]"
              >
                <button className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none">
                  <AiOutlineCalendar size="24px" />
                  <BiChevronDown />
                </button>
                {/* <DateRange isShownCalendar={isShownCalendar} /> */}
              </div>
            </div>
            <div>
              <span>Початок</span>
              <div
                className="border-2 border-buttonPurple rounded-[10px] overflow-hidden 
                        w-[210px] max-h-[230px] mb-[18px]"
              >
                <button
                  className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
                  onClick={() => {
                    setstartDaySelect(true);
                  }}
                >
                  <BiTimeFive size="24px" />
                  <BiChevronDown />
                </button>
                {startDaySelect && (
                  <div className="pl-[10px] pt-[12px] h-[215px] overflow-auto border-t-2 border-buttonPurple">
                    {options.map(option => (
                      <div
                        className="cursor-pointer h-[31px]"
                        key={option.value}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <span>Кінець</span>
              <div className="inline-block border-2 border-buttonPurple rounded-[10px] overflow-hidden w-[210px] max-h-[230px] mb-[18px] ">
                <button
                  className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
                  onClick={() => {
                    setendDaySelect(true);
                  }}
                >
                  <BiTimeFive size="24px" />
                  <BiChevronDown />
                </button>
                {endDaySelect && (
                  <ul className="absolute pl-[10px] pt-[12px] pr-[20px] h-[215px] border-buttonPurple border-0 overflow-auto border-t-2 border-buttonPurple">
                    {options.map(option => (
                      <li
                        className="cursor-pointer h-[31px] hover:bg-lightPurple"
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
                  ? 'bg-lightPurple text-gray-700'
                  : 'bg-buttonPurple text-white'
              }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
              onClick={() => setEventType(false)}
            >
              Оффлайн
            </button>
            <button
              className={`${
                eventType
                  ? 'bg-buttonPurple text-white'
                  : 'bg-lightPurple text-gray-700'
              }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
              onClick={() => setEventType(true)}
            >
              Онлайн
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-col  pr-4">
              <label id="city" className="pb-4">
                Mісто
              </label>
              {/* <ul className="overflow-auto border-t-2 border-buttonPurple">
                {cityOptions.map((option) => (
                  <li className='cursor-pointer'
                  key={option.value}>
                    {option.label}
                  </li>
                  ))}
              </ul> */}
            </div>
            <div className="flex flex-col">
              <label id="adress" className="pb-4">
                Адреса
              </label>
              <input
                id="adress"
                type="text"
                className="w-[245px] h-[52px] p-4 border-2 rounded-[10px] mr-4 "
                placeholder="Щекавицька, 42а"
                // onChange={(e) => onPriceChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[760px] h-[265px] rounded-[20px] border-2 border-buttonPurple flex flex-col p-8 pb-[32px]">
          <span className="pb-4 text-2xl">Вартість квитків</span>
          <div className="pb-6 ">
            <button
              className={`${
                ticketsType
                  ? 'bg-lightPurple text-gray-700'
                  : 'bg-buttonPurple text-white'
              }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
              onClick={() => setTicketsType(false)}
            >
              Платні
            </button>
            <button
              className={`${
                ticketsType
                  ? 'bg-buttonPurple text-white'
                  : 'bg-lightPurple text-gray-700' 
              }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
              onClick={() => setTicketsType(true)}
            >
              Безкоштовно
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="" id="" className="mb-3">
                Ціна
              </label>
              <input
                type="number"
                className="w-[245px] h-[52px] p-4 border-2 rounded-[10px] mr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="100 ₴"
                onChange={e => onPriceChange(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" id="" className="mb-3">
                Кількість квитків
              </label>
              <input
                type="number"
                className="w-[245px] h-[52px] p-4 border-2 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="100"
                // onChange={(e) => onPriceChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='text-center'>
        <SharedBtn type='submit' className='mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]' >Створити подію</SharedBtn>
        </div>
        
      </div>
      
    </>
  );
};

export default EventForm;
