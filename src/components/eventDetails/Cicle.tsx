import React from 'react';

import clsx from 'clsx';

interface IProps {
  top: string;
  left: string;
}

const Cicle: React.FC<IProps> = ({ top, left }) => {
  return (
    <div
      className={clsx(
        `w-[28px] h-[28px] rounded-full blur-[2px] absolute bg-eventDetails`
      )}
      style={{ top: `${top}px`, left: `${left}px` }}
    />
  );
};

export default Cicle;
