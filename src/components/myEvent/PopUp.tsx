import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProps {
  id: string;
  rejectEvent: () => void;
  approved?: boolean;
}

const PopUp: React.FC<IProps> = ({ id, rejectEvent, approved }) => {
  const navigate = useNavigate();

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://evently-book.vercel.app/event/${id}`
    );
    toast.success('Посилання скопійовано');
  };

  const handleSeeEvent = () => {
    if (approved) {
      navigate(`/event/${id}`);
    } else {
      toast.info('Ви не можете переглядати подію, коли вона на перевірці');
    }
  };

  return (
    <div
      data-name="kebab"
      className="absolute right-0 top-12 z-10 w-[206px] bg-background border border-buttonPurple rounded-[10px] py-3 flex flex-col gap-1"
    >
      <Link
        to={`/edit_event/${id}`}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Редагувати
      </Link>
      <h2
        onClick={handleSeeEvent}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Подивитись
      </h2>
      <h2
        onClick={copyLink}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Копіювати URL
      </h2>
      <h2
        onClick={rejectEvent}
        className="pl-6 py-2 text-base font-normal font-lato text-error leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Скасувати
      </h2>
    </div>
  );
};

export default PopUp;
