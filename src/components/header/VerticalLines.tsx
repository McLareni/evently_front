import { nanoid } from '@reduxjs/toolkit';

export const VerticalLines: React.FC = () => {
  return (
    <div className="hidden lg:block">
      <div
        key={nanoid()}
        className={`absolute w-[1px] top-0 bg-lightPurple left-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] top-0 bg-lightPurple left-10 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] top-0 bg-lightPurple right-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] top-0 bg-lightPurple right-10 h-full`}
      ></div>
    </div>
  );
};
