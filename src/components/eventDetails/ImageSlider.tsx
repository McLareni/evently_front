import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

import { useGetCountLikeEvent } from '@/hooks/query/useGetCountLikeEvent';
import clsx from 'clsx';

interface IProps {
  idEvent: string;
  toggleIsLiked: () => void;
  isLiked: boolean;
  images: string[];
}

const ImageSlider: React.FC<IProps> = ({
  idEvent,
  toggleIsLiked,
  isLiked,
  images,
}) => {
  const { count: countLike } = useGetCountLikeEvent(idEvent || '');
  const [sliderImage, setSliderImage] = useState(images);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderImage(prev => {
        const curr = [...prev];
        const updated = [];

        updated[0] = curr[1];
        updated[1] = curr[2];
        updated[2] = curr[0];

        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

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
            'rounded-[20px] absolute top-[calc(50%)] -translate-x-1/2 -translate-y-1/2 object-cover animate-opacity opacity-100',
            {
              'left-[50%] w-[312px] h-[514px] z-10': index === 0,
              'left-[calc(50%-200px)] w-[200px] h-[348px]': index === 1,
              'left-[calc(50%+200px)] w-[200px] h-[348px]': index === 2,
            }
          )}
        />
      ))}
    </div>
  );
};

export default ImageSlider;