import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import { usePreventScroll } from '@/hooks/usePreventScroll';

import Button from './Button';
import { EventCard } from './EventCard';

const event = {
  category: 'TOP_EVENTS',
  createdBy: null,
  creationDate: '2024-10-10T10:00:00',
  date: {
    day: '2025-12-21',
  },
  endTime: null,
  time: '18:00',
  description:
    'Події – це спеціально організовані заходи, спрямовані на створення спільного досвіду, обмін знаннями чи дозвілля. Вони можуть мати різний масштаб і формат: від камерних зустрічей до великих фестивалів чи міжнародних конференцій. Події бувають освітні (семінари, тренінги), культурні (концерти, виставки), спортивні (змагання, марафони) та корпоративні (презентації, тімбілдинги). Кожна подія має унікальну концепцію, програму та мету, що залучає відповідну аудиторію. Вони допомагають налагоджувати зв’язки, ділитися ідеями, святкувати важливі події чи просто насолоджуватися моментом у колі однодумців.',
  eventStatus: 'APPROVED',
  eventUrl: null,
  id: '671e833c56827a52cc267660',
  images: null,
  location: {
    city: 'Київ',
    latitude: null,
    longitude: null,
    street: 'вул. Уманська, 35',
    venue: 'Палац Спорту',
  },
  organizers: [],
  phoneNumber: '+380123456789',
  photoUrl:
    'https://res.cloudinary.com/dlweazskq/image/upload/v1729884314/bookMyEventApp/ex48jo5rzau0yh764dji.png',
  price: 1000,
  rating: 4.5,
  tickets: 10000,
  title: 'Max Barskih',
  type: 'CONCERTS',
} as unknown as Event;

export const PopupEventCreated = () => {
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
        <p className="text-[20px]">
          Після перевірки вона з’явиться на платформі
        </p>
        <EventCard event={event} />
        <NavLink to={'/'}>
          <Button>Закрити</Button>
        </NavLink>
      </div>
    </div>,
    document.body
  );
};
