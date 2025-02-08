import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { PiHeartFill } from 'react-icons/pi';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import { FormaDataForCard } from '@/pages/events/CreateEventPage';

import { SharedBtn } from '@/components/ui';

import exampleCard from '/images/exampleCard.svg';

type CardProps = {
  place: CreateEventLocation;
  photo: string | null;
  date: string;
  startTimeOption: string;
  eventInfoData: FormaDataForCard;
};

const CreateEventCard: React.FC<CardProps> = ({
  photo,
  place,
  date,
  startTimeOption,
  eventInfoData,
}) => {
  const formattedDate = formatDateToDayMonth(date);

  const { title, eventTypeName, ticketPrice, freeTickets, isOffline } =
    eventInfoData;

  const formattedTitle =
    (title && title.length > 45 && title.slice(0, 45) + '...') || title;

  const formatPrice = () => {
    if (freeTickets) return 'Безкоштовно';
    if (ticketPrice.length === 0 && !freeTickets) return 'Ціна';
    return `${ticketPrice}  ₴`;
  };

  const formattedPrice = formatPrice();

  return (
    <>
      <div
        className=" sticky group relative flex overflow-hidden items-start rounded-[20px] 
      shadow-eventCardShadow max-h-[514px] max-w-[312px] w-[312px] h-[514px] top-[150px] mr-[135px] "
      >
        {photo ? (
          <img className="" src={photo} width={'100%'} alt="Example Card" />
        ) : (
          <img
            className="opacity-20"
            src={exampleCard}
            width={'100%'}
            alt="Example Card"
          />
        )}
        <div className="flex absolute justify-between p-6 w-full">
          <div className="focus:outline-none ml-auto bg-background w-[32px] h-[32px] flex items-center justify-center rounded-full opacity-60">
            <PiHeartFill className="w-6 h-6 text-borderColor cursor-pointer" />
          </div>
        </div>
        <div
          className="absolute flex flex-col items-start gap-2 justify-between w-full py-4 px-5 h-[365px]
          rounded-t-[20px] bg-background transition-all ease-in-out duration-300 -bottom-[70px]
          group-hover:-bottom-0 "
        >
          <div
            className="flex items-center justify-center h-8 rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient"
          >
            <p className="font-normal text-md text-textDark px-4 py-2.5">
              {eventTypeName || 'Категорія'}
            </p>
          </div>
          <h2 className="min-h-[72px] text-2xl text-textDark break-words whitespace-normal truncate max-w-[250px]">
            {title.length === 0 ? 'Назва події' : formattedTitle}
          </h2>
          <ul className="flex flex-col gap-[18px] font-normal text-md text-textDark justify-between w-full">
            <li className="flex items-center gap-[18px]">
              <AiOutlineCalendar size="24px" />
              {date ? (
                <p>
                  {formattedDate}, {startTimeOption}
                </p>
              ) : (
                <p>Дата</p>
              )}
            </li>
            <li className="flex items-center gap-[18px]">
              <GrLocation size="24px" />
              {place.city.length === 0 && isOffline && <p>Місце</p>}
              {place.city.length > 0 && isOffline && (
                <p>
                  {place.city}, {place.street}
                </p>
              )}
              {!isOffline && <p>Онлайн</p>}
            </li>
            <li className="flex items-center gap-[18px]">
              <FaRegMoneyBillAlt size="24px" />
              <p className={`${freeTickets ? 'text-error' : ''}`}>
                {formattedPrice}
              </p>
            </li>
          </ul>
          <SharedBtn type="button" primary className="w-[230px] h-12 mx-auto">
            Хочу
          </SharedBtn>
        </div>
      </div>
    </>
  );
};

export default CreateEventCard;
