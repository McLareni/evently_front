import { nanoid } from '@reduxjs/toolkit';


export const FooterLines: React.FC = () => {
  return (
    <>
      <div
        key={nanoid()}
        className={`absolute h-[1px] translate-x-[-50%] left-[50%] bg-lightPurple top-0 w-full z-10`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute h-[1px]  translate-x-[-50%] left-[50%] bg-lightPurple -top-5 w-full z-10`}
      ></div>
    </>
  );
};
