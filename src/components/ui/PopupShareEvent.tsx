import { createPortal } from 'react-dom';
import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { LiaTelegram } from 'react-icons/lia';

import { usePreventScroll } from '@/hooks/usePreventScroll';

interface PopupShareEventProps {
  closePopup: () => void;
}

export const PopupShareEvent = ({ closePopup }: PopupShareEventProps) => {
  usePreventScroll();

  return createPortal(
    <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
      <div className="bg-background flex flex-col gap-[24px] items-center rounded-[20px] border-lightPurple border-2">
        <div className="flex px-[116px] py-[24px] border-b-lightPurple border-b-2">
          <p>Поділитися подією з друзями</p>
          <button onClick={closePopup}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex py-[24px]">
          <LiaTelegram />
          <FaInstagram />
          <FiFacebook />
          <FaViber />
        </div>
      </div>
    </div>,
    document.body
  );
};
