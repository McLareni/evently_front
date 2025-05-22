import { useRef, useState } from 'react';
import Slider from 'react-slick';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { nanoid } from '@reduxjs/toolkit';

import { Dots } from '../hero/Dots';
import { EventCard } from '../ui';

interface IProps {
  events?: Event[];
}

export const MobileSlider: React.FC<IProps> = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const width = useScreenWidth();

  const countEventOnSlide = Math.max(1, width / 220);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: false,
    speed: 2000,
    slidesToShow: countEventOnSlide,
    slidesToScroll: 1,
    slidesPerRow: 1,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      console.log('newIndex', newIndex);

      setCurrentSlide(Math.ceil(newIndex));
    },
  };

  const setSlideByDot = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="w-full lg:px-[41px] px-4">
      <div className="lg:w-full w-[100%-32px] mx-auto overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {events?.map(event => (
            <div
              key={nanoid()}
              className="!flex !flex-row gap-4 !w-[200px] h-[310px]"
            >
              <EventCard key={event.id} event={event} top />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex items-center justify-center gap-[8px]">
        <Dots
          slides={events?.slice(0, events.length + 2 - countEventOnSlide) || []}
          currentSlide={currentSlide}
          setSlideByDot={setSlideByDot}
        />
      </div>
    </div>
  );
};
