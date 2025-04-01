import { useRef, useState } from 'react';
import Slider from 'react-slick';

import { slides } from '@/assets/heroSlides/slides';

import { Dots } from './Dots';
import { PrevNextBtn } from './PrevNextBtn';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  const setNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const setPrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const setSlideByDot = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="w-full px-[41px]">
      <Slider ref={sliderRef} {...settings}>
        {slides.map(item => (
          <div key={item.id} className="aspect-[1356/420]">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="flex items-center justify-center gap-[8px]">
        <PrevNextBtn onClick={setPrevSlide} />
        <Dots
          slides={slides}
          currentSlide={currentSlide}
          setSlideByDot={setSlideByDot}
        />
        <PrevNextBtn onClick={setNextSlide} className="rotate-180" />
      </div>
    </div>
  );
};
