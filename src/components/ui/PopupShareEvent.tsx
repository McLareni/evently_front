import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiCopy } from 'react-icons/bi';
import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { LiaTelegram } from 'react-icons/lia';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

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
      return toast.success('Текст скопійовано');
    } catch (err) {
      console.log(err);
      return toast.error('Не вдалося скопіювати текст: ');
    }
  };

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    eventUrl
  )}`;

  const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(eventUrl)}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;

  const viberShareUrl = `viber://forward?text=${encodeURIComponent(eventUrl)}`;

  useEffect(() => {
    setEventUrl(`https://evently-book.vercel.app${pathname}`);
  }, [pathname]);

  return createPortal(
    <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
      <div className="min-w-[448px] relative bg-background flex flex-col items-center rounded-[20px] border-lightPurple border-[1px]">
        <div className="flex w-full justify-center py-[16px] border-b-lightPurple border-b-[1px]">
          <p className="text-[20px]">Поділитися подією з друзями</p>
          <button
            className="absolute right-[16px] top-[16px]"
            onClick={closePopup}
          >
            <IoMdClose size={18} />
          </button>
        </div>
        <div className=" flex flex-col gap-[16px] items-center pt-[32px] pb-[16px] px-[86px]">
          <div className="flex gap-[24px]">
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LiaTelegram size={32} />
            </a>
            <a
              href={instagramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook size={32} />
            </a>
            <a href={viberShareUrl} target="_blank" rel="noopener noreferrer">
              <FaViber size={32} />
            </a>
          </div>
          <button
            onClick={handleCopy}
            type="button"
            className="focus:outline-none"
          >
            <div className="flex gap-2 justify-between items-center border-lightPurple border-[1px] rounded-[10px] p-[8px]">
              <div className="text-left">
                <p>Event URL</p>
                <p>{eventUrl}</p>
              </div>
              <BiCopy size={24} />
            </div>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
