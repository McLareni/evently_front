import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { usePreventScroll } from '@/hooks/usePreventScroll';

import { EventCard } from './EventCard';
import { SharedBtn } from './SharedBtn';

interface PopupEventCreatedProps {
  event: Event;
}

export const PopupEventCreated = ({ event }: PopupEventCreatedProps) => {
  usePreventScroll();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const { width, height } = getWindowDimensions();

  return createPortal(
    <div className="fixed lg:top-0 top-[71px] bottom-0 left-0 p-0 lg:p-[24px] z-20 w-full h-full flex justify-center items-start bg-white bg-opacity-50 overflow-hidden lg:overflow-scroll">
      <Confetti
        width={width}
        height={height}
        gravity={0.2}
        numberOfPieces={300}
      />
      <div className="lg:px-[116px] lg:py-[42px] px-4 bg-bg-gradient flex flex-col gap-8 lg:gap-[24px] items-center justify-center rounded-none lg:rounded-[20px] h-full">
        <p
          className="font-oswald text-[32px] lg:text-[64px] inline-block"
          style={{
            background:
              'linear-gradient(98.01deg, #12C2E9 2.11%, #C471ED 75.16%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ура! Твоя подія створена!
        </p>
        <div className="w-[171px] lg:w-[312px]">
          <EventCard event={event} isEventCreated />
        </div>
        <div className="flex gap-[2px] items-center">
          <AiOutlineInfoCircle size={20} color="#6B7280" />
          <p className="text-[14px] text-[#6B7280]">
            Після перевірки подія з’явиться на платформі
          </p>
        </div>
        <NavLink to={'/my-event'}>
          <SharedBtn primary type="button" className="h-12 w-[265px]">
            Закрити
          </SharedBtn>
        </NavLink>
      </div>
    </div>,
    document.body
  );
};
