import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import clsx from 'clsx';

export interface CustomArrowProps {
  next?: boolean;
  currentSlide?: number;
  slideCount?: number;
}

export const MySliderBtn: React.FC<CustomArrowProps> = ({
  next = false,
  currentSlide = 0,
  slideCount = 0,
  ...props
}): React.JSX.Element => {
  const isActiveNext = currentSlide > slideCount - 5;
  const isActivePrev = currentSlide === 0;

  const isActive = next ? isActiveNext : isActivePrev;

  return (
    <button
      {...props}
      aria-label="change slide button"
      className={clsx(
        `absolute -top-20 flex items-center justify-center w-[40px] h-[40px] rounded-full 
         focus:outline-none transition-all duration-300 active:scale-90`,
        {
          'cursor-default': isActive,
          'cursor-pointer': !isActive,
          [`${
            !isActive
              ? 'text-background bg-borderColor '
              : 'text-textDark bg-gray'
          }`]: true,
        },
        next ? 'right-16' : 'right-[125px]'
      )}
    >
      <MdKeyboardArrowLeft
        className={`ml-auto mr-auto text-inherit w-10 h-10 ${next && 'rotate-180'}`}
      />
    </button>
  );
};
