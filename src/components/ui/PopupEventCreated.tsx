import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { usePreventScroll } from '@/hooks/usePreventScroll';

import Button from './Button';
import { EventCard } from './EventCard';

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
    <div className="fixed top-0 left-0 p-[24px] z-20 w-full h-full flex justify-center items-start bg-white bg-opacity-50 overflow-scroll">
      <Confetti
        width={width}
        height={height}
        gravity={0.2}
        numberOfPieces={300}
      />
      <div className="px-[116px] py-[42px] bg-bg-gradient flex flex-col gap-[24px] items-center rounded-[20px]">
        <p
          className="font-oswald text-[64px] inline-block"
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
        <EventCard event={event} isEventCreated />
        <div className="flex gap-[2px] items-center">
          <AiOutlineInfoCircle size={20} color="#6B7280" />
          <p className="text-[14px] text-[#6B7280]">
            Після перевірки подія з’явиться на платформі
          </p>
        </div>
        <NavLink to={'/my-event'}>
          <Button>Закрити</Button>
        </NavLink>
      </div>
    </div>,
    document.body
  );
};
