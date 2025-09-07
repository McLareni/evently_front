import React, { useEffect, useRef } from 'react';

interface IProps {
  closePopUp: () => void;
  popUpIsOpen: boolean;
}

const PopUp: React.FC<IProps> = ({ closePopUp, popUpIsOpen }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopUp();
      }
    };

    if (popUpIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popUpIsOpen]);

  return (
    <div
      ref={popupRef}
      className="bg-background rounded-[5px] lg:rounded-[10px] border border-buttonPurple w-[168px] lg:w-[206px] absolute top-14 right-6 flex flex-col"
    >
      <button className="px-6 py-2 text-start focus:outline-none text-sm lg:text-base !leading-loose">
        Повернути квиток
      </button>
      <button className="px-6 py-2 text-start focus:outline-none text-sm lg:text-base !leading-loose">
        Скачати PDF
      </button>
    </div>
  );
};

export default PopUp;
