import React from 'react';
import { GiSevenPointedStar } from 'react-icons/gi';

import clsx from 'clsx';

interface IProps {
  top: string;
  left: string;
}

const Star: React.FC<IProps> = ({ top, left }) => {
  const Y = `top-[${top}px]`;
  const X = `left-[${left}px]`;

  return (
    <GiSevenPointedStar
      className={clsx('w-[28px] h-[28px] blur-[2px] absolute ' + Y + ' ' + X)}
      style={{
        fill: 'url(#gradient)',
      }}
    />
  );
};

export default Star;
