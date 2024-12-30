import { ButtonHTMLAttributes } from 'react';

import { nanoid } from '@reduxjs/toolkit';

interface DotsProps<T> extends ButtonHTMLAttributes<HTMLButtonElement> {
  slides: T[];
  currentSlide: number;
  // eslint-disable-next-line no-unused-vars
  setSlideByDot: (index: number) => void;
}

export const Dots = <T,>({
  slides,
  currentSlide,
  setSlideByDot,
}: DotsProps<T>) => {
  return (
    <div className="flex items-center gap-[8px]">
      {slides.map(slide => (
        <button
          key={nanoid()}
          onClick={() => setSlideByDot(slides.indexOf(slide))}
          aria-label="change slide dot"
          className={`rounded-full flex items-center cursor-pointer focus:outline-none
          ${slides.indexOf(slide) === currentSlide ? 'bg-textDark size-3 ' : 'bg-darkGray size-2'}
          `}
        ></button>
      ))}
    </div>
  );
};
