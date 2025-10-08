import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProps {
  id: string;
  approved?: boolean;
  deleteEvent: () => void;
}

const PopUp: React.FC<IProps> = ({ id, approved = false, deleteEvent }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);

  const copyLink = () => {
    if (approved) {
      navigator.clipboard.writeText(
        `https://evently-book.vercel.app/event/${id}`
      );
      toast.success('Посилання скопійовано');
    } else {
      toast.info('Ви не можете копіювати посилання, коли подія на перевірці');
    }
  };

  const handleSeeEvent = () => {
    if (approved) {
      navigate(`/event/${id}`);
    } else {
      toast.info('Ви не можете переглядати подію, коли вона на перевірці');
    }
  };

  const handleEditEvent = () => {
    if (approved) {
      navigate(`/edit_event/${id}`);
    } else {
      toast.info('Ви не можете редагувати подію, коли вона на перевірці');
    }
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return isOpen ? (
    <div
      data-name="kebab"
      className="absolute lg:right-0 right-3 lg:top-12 top-4 z-20 w-[206px] bg-background border border-buttonPurple rounded-[10px] py-3 flex flex-col gap-1"
    >
      <h2
        onClick={handleEditEvent}
        className="pl-6 py-2 text-base font-normal font-lato text-textDark leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Редагувати
      </h2>
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
        onClick={deleteEvent}
        className="pl-6 py-2 text-base font-normal font-lato text-error leading-[38px] rounded-[18px] hover:cursor-pointer hover:bg-gray"
      >
        Скасувати
      </h2>
    </div>
  ) : null;
};

export default PopUp;
