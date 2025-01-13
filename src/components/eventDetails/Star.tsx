import React from 'react';
import { GiSevenPointedStar } from 'react-icons/gi';

import clsx from 'clsx';

interface IProps {
  top: string;
  left: string;
}

const Star: React.FC<IProps> = ({ top, left }) => {
  return (
    <GiSevenPointedStar
      className={clsx('w-[28px] h-[28px] blur-[2px] absolute')}
      style={{
        fill: 'url(#gradient)',
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  );
};

export default Star;
