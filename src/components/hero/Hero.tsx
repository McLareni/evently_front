import { useState } from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Dots } from './Dots';
import { PrevNextBtn } from './PrevNextBtn';
import Banner1 from './banners/Banner1';
import Banner2 from './banners/Banner2';
import Banner3 from './banners/Banner3';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const width = useScreenWidth();

  const [banner1Visible, setBanner1Visible] = useState(true);

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

  const slides = [
    <Banner1 key={0} visible={banner1Visible} />,
    <Banner2 key={1} visible={banner1Visible} />,
    <Banner3 key={2} visible={banner1Visible} />,
  ];

  return (
    <div className="w-full px-4 lg:px-[41px]">
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
            setCurrentSlide(swiper.realIndex);
          }}
          onSlideChangeTransitionStart={() => {
            setBanner1Visible(false);
          }}
          onSlideChangeTransitionEnd={() => {
            setBanner1Visible(true);
          }}
        >
          {slides.map((Slide, index) => (
            <SwiperSlide key={index} className="lg:h-[575px] h-[237px]">
              {Slide}
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
