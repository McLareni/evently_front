import { MySliderBtn } from './MySliderBtn';
import { Container } from '../container/Container';
import { EventCard } from '../ui';
import { IEvent } from '@/types/components';
import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TopEventsProps {
  filteredEvents: IEvent[] | undefined;
}

export const TopEvents: React.FC<TopEventsProps> = ({ filteredEvents }) => {
  const sliderRef = useRef<Slider | null>(null);

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

  return (
    <div>
      <Container>
        <h1 className="mb-[32px]">Топ подій</h1>
      </Container>
      <div className="pl-[60px] position-relative">
        <Slider ref={sliderRef} {...settings}>
          {filteredEvents?.map(item => (
            <EventCard key={nanoid()} event={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
