import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

import clsx from 'clsx';

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

  useEffect(() => {
    let interval: number;
    if (sliderImage.length === 3) {
      interval = window.setInterval(() => {
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
      interval = window.setInterval(() => {
        setSliderImage(prev => {
          const curr = [...prev];
          const updated = [];

          updated[0] = curr[1];
          updated[1] = curr[0];

          return updated;
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [images, sliderImage.length]);

  return (
    <div className="flex-1 relative">
      <button
        type="button"
        onClick={toggleIsLiked}
        aria-label="like button"
        className={`focus:outline-none bg-filter-btn-gradient px-4 py-[7px] text-background text-base rounded-[20px] flex gap-[10px] absolute left-[60%] top-[35px] z-20`}
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
          className={clsx(
            'rounded-[20px] absolute top-[calc(50%)] -translate-x-1/2 -translate-y-1/2 object-cover opacity-100',
            {
              'left-[50%] w-[312px] h-[514px] z-10 animate-opacity':
                index === 0,
              'left-[calc(50%-200px)] w-[200px] h-[348px] animate-opacity-delay':
                index === 1 && sliderImage.length === 3,
              'left-[calc(50%+200px)] w-[200px] h-[348px] animate-opacity-delay':
                index === 2 && sliderImage.length === 3,

              'left-[53%] w-[312px] h-[450px]':
                index === 1 && sliderImage.length === 2,
            }
          )}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
