import { useRef } from 'react';
import Slider, { Settings } from 'react-slick';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Container } from '../container/Container';
import { EventCard } from '../ui';
import { MobileSlider } from './MobileSlider';
import { MySliderBtn } from './MySliderBtn';

interface TopEventsProps {
  filteredEvents: Event[];
}

export const TopEvents: React.FC<TopEventsProps> = ({ filteredEvents }) => {
  const sliderRef = useRef<Slider | null>(null);
  const width = useScreenWidth();

  const settings: Settings = {
    pauseOnHover: true,
    slidesToShow: 4.15,
    slidesToScroll: 4,
    speed: 2000,
    infinite: false,
    prevArrow: <MySliderBtn />,
    nextArrow: <MySliderBtn next />,
    arrows: true,
    pauseOnFocus: true,
    initialSlide: 0,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '10%',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const editedListEvents: Event[] = filteredEvents?.map(event => ({
    ...event,
    category: 'NEW_EVENTS',
  }));

  return (
    <div>
      <Container>
        <h1
          className={clsx('lg:mb-[32px] mb-4', {
            'text-[28px] leading-normal': width < 1024,
          })}
        >
          Нові події
        </h1>
      </Container>
      <div className="lg:pl-[60px] lg:pr-0 px-4  relative">
        {width < 1024 ? (
          <MobileSlider events={editedListEvents} />
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {editedListEvents?.map(item => (
              <div key={nanoid()}>
                <EventCard event={item} top />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};
