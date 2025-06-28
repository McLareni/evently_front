import { useState } from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Dots } from '../hero/Dots';
import { EventCard } from '../ui';

interface IProps {
  events?: Event[];
}

export const MobileSlider: React.FC<IProps> = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const width = useScreenWidth();

  const setSlideByDot = (index: number) => {
    swiperInstance?.slideTo(index);
    setCurrentSlide(index);
  };

  return (
    <div className="w-full lg:px-[41px]">
      <Swiper
        className="h-[315px]"
        slidesPerView={Math.floor(width / 171)}
        spaceBetween={16}
        onSwiper={setSwiperInstance}
        onSlideChange={swiper => {
          setCurrentSlide(swiper.activeIndex);
        }}
      >
        {events?.map(event => (
          <SwiperSlide
            key={event.id}
            className="flex items-center justify-center min-w-[171px]"
          >
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-center gap-[8px]">
        <Dots
          slides={
            events?.slice(0, events.length + 1 - Math.floor(width / 170)) || []
          }
          currentSlide={currentSlide}
          setSlideByDot={setSlideByDot}
        />
      </div>
    </div>
  );
};
