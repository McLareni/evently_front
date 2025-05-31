import { useState } from 'react';

import { slides } from '@/assets/heroSlides/slides';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Dots } from './Dots';
import { PrevNextBtn } from './PrevNextBtn';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const width = useScreenWidth();

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
    <div className="w-full lg:px-[41px]">
      <div className="overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={2000}
          slidesPerView={1}
          autoplay={{
            delay: 10000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={swiper => {
            setCurrentSlide(swiper.activeIndex);
          }}
        >
          {slides.map(item => (
            <SwiperSlide key={item.id} className="lg:h-[420px] h-[237px]">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center gap-[8px]">
        {width >= 1024 && <PrevNextBtn onClick={setPrevSlide} />}
        <Dots
          slides={slides}
          currentSlide={currentSlide}
          setSlideByDot={setSlideByDot}
        />
        {width >= 1024 && (
          <PrevNextBtn onClick={setNextSlide} className="rotate-180" />
        )}
      </div>
    </div>
  );
};
