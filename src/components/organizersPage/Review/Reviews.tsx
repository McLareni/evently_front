import { useState } from 'react';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import { CardData } from '@/pages/OrganizersPage';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { PrevNextBtn } from '@/components/hero/PrevNextBtn';

import CommentCard from './CommentCard';

interface ReviewsProps {
  data: CardData[];
}

const Reviews: React.FC<ReviewsProps> = ({ data }) => {
  const { isMobile } = useMediaVariables();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const setNextSlide = () => {
    swiperInstance?.slideNext();
  };

  const setPrevSlide = () => {
    swiperInstance?.slidePrev();
  };

  return (
    <>
      <div className="mb-6 lg:mb-16 relative">
        <h1 className="!mb-8 text-[28px] lg:text-[64px] leading-normal">
          Відгуки
        </h1>
        <div className="absolute top-1 right-0 flex items-center justify-center gap-6">
          <PrevNextBtn
            onClick={setPrevSlide}
            className={clsx(
              'rounded-full !w-8 !h-8',
              isBeginning ? 'bg-lightGray' : 'bg-borderColor'
            )}
            disabled={isBeginning}
            colorIcon="fill-background"
          />

          <PrevNextBtn
            onClick={setNextSlide}
            className={clsx(
              'rounded-full rotate-180 fill-transparent !w-8 !h-8',
              isEnd ? 'bg-lightGray' : 'bg-borderColor'
            )}
            disabled={isEnd}
            colorIcon="fill-background"
          />
        </div>

        <Swiper
          loop={false}
          speed={1000}
          slidesPerView={isMobile ? 1 : 3.15}
          onSwiper={setSwiperInstance}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {data?.map(item => (
            <SwiperSlide key={nanoid()} className="p-1 h-auto">
              <CommentCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Reviews;
