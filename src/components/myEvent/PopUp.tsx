import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProps {
  id: string;
}

const PopUp: React.FC<IProps> = ({ id }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(`/event/${id}`);
    toast.success('Посилання скопійовано');
  };

  return (
    <div
      data-name="kebab"
      className="absolute right-0 top-12 z-10 w-[206px] bg-background border border-buttonPurple rounded-[10px] py-3 flex flex-col gap-1"
    >
      <h2 className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray">
        Редагувати
      </h2>
      <Link
        to={`/event/${id}`}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Подивитись
      </Link>
      <h2
        onClick={copyLink}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Копіювати URL
      </h2>
      <h2 className="pl-6 py-2 text-base font-normal font-lato text-error leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray">
        Скасувати
      </h2>
    </div>
  );
};

export default PopUp;
