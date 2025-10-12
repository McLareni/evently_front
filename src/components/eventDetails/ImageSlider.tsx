import React, { useEffect, useRef, useState } from 'react';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';

import { Dots } from '../hero/Dots';

interface IProps {
  countLike: number;
  toggleIsLiked: () => void;
  isLiked: boolean;
  images: string[];
}

const ImageSlider: React.FC<IProps> = ({
  countLike,
  toggleIsLiked,
  isLiked,
  images,
}) => {
  const [sliderImage, setSliderImage] = useState(images);
  const [activeSlide, setActiveSlide] = useState(0);
  const { isMobile } = useMediaVariables();

  const intervalRef = useRef<number | null>(null);

  const startInterval = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (sliderImage.length === 3) {
      intervalRef.current = window.setInterval(() => {
        setSliderImage(prev => {
          const curr = [...prev];
          const updated = [];
          updated[0] = curr[1];
          updated[1] = curr[2];
          updated[2] = curr[0];
          return updated;
        });
      }, 5000);
    }

    if (sliderImage.length === 2) {
      intervalRef.current = window.setInterval(() => {
        setSliderImage(prev => {
          const curr = [...prev];
          const updated = [];
          updated[0] = curr[1];
          updated[1] = curr[0];
          return updated;
        });
      }, 5000);
    }
  }, [sliderImage.length]);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, sliderImage.length, startInterval]);

  useEffect(() => {
    const mainImage = sliderImage[0];
    const index = images.findIndex(img => img === mainImage);
    if (index !== -1) setActiveSlide(index);
  }, [sliderImage]);

  const changeSlide = (index: number) => {
    setActiveSlide(index);
    setSliderImage(() => {
      const updated = [];

      if (sliderImage.length === 2) {
        updated[0] = images[index];
        updated[1] = images[index === 0 ? 1 : 0];
      } else if (sliderImage.length === 3) {
        updated[0] = images[index];
        updated[1] = images[index === 0 ? 1 : index === 1 ? 2 : 0];
        updated[2] = images[index === 0 ? 2 : index === 1 ? 0 : 1];
      } else {
        updated[0] = images[index];
      }

      return updated;
    });

    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <>
      <div className="lg:flex-1 lg:relative">
        <button
          type="button"
          onClick={toggleIsLiked}
          aria-label="like button"
          className={`animate-my-bounce focus:outline-none bg-filter-btn-gradient px-4 py-[7px] text-background text-base rounded-[20px] flex gap-[10px] 
            absolute left-[calc(50%+110px)] lg:left-[calc(50%+100px)] lg:top-[50px] top-[50px] z-20`}
        >
          {isLiked ? (
            <PiHeartFill className={`w-6 h-6 fill-background`} />
          ) : (
            <PiHeartLight className="w-6 h-6 fill-background" />
          )}
          {countLike}
        </button>
        {sliderImage?.map((image, index) => (
          <img
            key={`${image}${index}`}
            src={image || ''}
            onClick={() => changeSlide(images.indexOf(image))}
            className={clsx(
              'rounded-[20px] absolute top-[calc(50%)] -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-100',
              {
                'left-[50%] lg:w-[312px] w-[320px] lg:h-[514px] h-[540px] z-10 animate-opacity':
                  index === 0,
                'lg:left-[calc(50%-200px)] left-[calc(50%-80px)] w-[200px] h-[348px] animate-opacity-delay':
                  index === 1 && sliderImage.length === 3,
                'lg:left-[calc(50%+200px)] left-[calc(50%+80px)] w-[200px] h-[348px] animate-opacity-delay':
                  index === 2 && sliderImage.length === 3,

                'left-[53%] w-[312px] h-[450px]':
                  index === 1 && sliderImage.length === 2,
              }
            )}
          />
        ))}
      </div>
      {sliderImage.length > 1 && isMobile && (
        <div className="w-fit mx-auto absolute bottom-0 left-1/2 -translate-x-1/2">
          <Dots
            slides={images}
            currentSlide={activeSlide}
            setSlideByDot={changeSlide}
          />
        </div>
      )}
    </>
  );
};

export default ImageSlider;
