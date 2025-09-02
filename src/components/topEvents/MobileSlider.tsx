import { useState } from 'react';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import clsx from 'clsx';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Dots } from '../hero/Dots';
import { PrevNextBtn } from '../hero/PrevNextBtn';
import { EventCard } from '../ui';

interface IProps {
  events?: Event[];
}

export const MobileSlider: React.FC<IProps> = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const width = useScreenWidth();
  const { isMobile, isDesktop } = useMediaVariables();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const setSlideByDot = (index: number) => {
    swiperInstance?.slideTo(index);
    setCurrentSlide(index);
  };

  const setNextSlide = () => {
    swiperInstance?.slideNext();
  };

  const setPrevSlide = () => {
    swiperInstance?.slidePrev();
  };

  return (
    <div className="w-full relative">
      <Swiper
        className="h-[315px] lg:h-[514px]"
        slidesPerView={isMobile ? Math.floor(width / 171) : 4.15}
        spaceBetween={isMobile ? 16 : 24}
        onSwiper={setSwiperInstance}
        onSlideChange={swiper => {
          setCurrentSlide(swiper.activeIndex);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {events?.map(event => (
          <SwiperSlide
            key={event.id}
            className="flex items-center justify-center min-w-[171px] pb-2"
          >
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isDesktop && (
        <div className="absolute -top-28 right-[70px] flex items-center justify-center gap-6">
          <PrevNextBtn
            onClick={setPrevSlide}
            className={clsx(
              'rounded-full',
              isBeginning ? 'bg-lightGray' : 'bg-borderColor'
            )}
            disabled={isBeginning}
            colorIcon="fill-background"
          />

          <PrevNextBtn
            onClick={setNextSlide}
            className={clsx(
              'rounded-full rotate-180 fill-transparent',
              isEnd ? 'bg-lightGray' : 'bg-borderColor'
            )}
            disabled={isEnd}
            colorIcon="fill-background"
          />
        </div>
      )}
      {isMobile && (
        <div className="flex items-center justify-center gap-[8px]">
          <Dots
            slides={
              events?.slice(0, events.length + 1 - Math.floor(width / 170)) ||
              []
            }
            currentSlide={currentSlide}
            setSlideByDot={setSlideByDot}
          />
        </div>
      )}
    </div>
  );
};
