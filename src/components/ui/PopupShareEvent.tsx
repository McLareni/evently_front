import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiCopy } from 'react-icons/bi';
import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { LiaTelegram } from 'react-icons/lia';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { cutStringWithDots } from '@/helpers/cutStringWithDots';
import { usePreventScroll } from '@/hooks/usePreventScroll';

interface PopupShareEventProps {
  closePopup: () => void;
}

export const PopupShareEvent = ({ closePopup }: PopupShareEventProps) => {
  const [eventUrl, setEventUrl] = useState('');

  usePreventScroll();

  const { pathname } = useLocation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      return toast.success('Посилання скопійовано');
    } catch (err) {
      console.log(err);
      return toast.error('Не вдалося скопіювати текст: ');
    }
  };

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    eventUrl
  )}`;

  const cutEventUrls = cutStringWithDots(eventUrl, 44);

  const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(eventUrl)}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;

  const viberShareUrl = `viber://forward?text=${encodeURIComponent(eventUrl)}`;

  useEffect(() => {
    setEventUrl(`https://evently-book.vercel.app${pathname}`);
  }, [pathname]);

  return createPortal(
    <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
      <div className="leading-[1.2] min-w-[448px] relative bg-background flex flex-col items-center rounded-[20px] border-buttonPurple border-[1px]">
        <div className="flex w-full justify-center py-[16px] border-b-buttonPurple border-b-[1px]">
          <p className="text-[20px]">Поділитися подією з друзями</p>
          <button
            className="absolute right-[16px] top-[16px]"
            onClick={closePopup}
          >
            <IoMdClose
              size={18}
              className="hover:scale-125 transition-transform duration-300"
            />
          </button>
        </div>
        <div className=" flex flex-col gap-[16px] items-center pt-[32px] pb-[16px] px-[72px]">
          <div className="flex gap-[24px]">
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LiaTelegram
                size={32}
                className="hover:text-buttonPurple transition-colors duration-300"
              />
            </a>
            <a
              href={instagramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={32}
                className="hover:text-buttonPurple transition-colors duration-300"
              />
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook
                size={32}
                className="hover:text-buttonPurple transition-colors duration-300"
              />
            </a>
            <a href={viberShareUrl} target="_blank" rel="noopener noreferrer">
              <FaViber
                size={32}
                className="hover:text-buttonPurple transition-colors duration-300"
              />
            </a>
          </div>
          <button
            onClick={handleCopy}
            type="button"
            className="focus:outline-none"
          >
            <div className="flex gap-2 justify-between items-center border-buttonPurple border-[1px] rounded-[10px] p-[8px]">
              <div className="text-left">
                <p className="mb-[3px]">Event URL</p>
                <p className="text-[12px]">{cutEventUrls}</p>
              </div>
              <BiCopy
                size={24}
                className="hover:text-buttonPurple transition-colors duration-300"
              />
            </div>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
