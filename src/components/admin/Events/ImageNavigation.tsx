import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

import clsx from 'clsx';

interface IProps {
  activeImage: number;
  // eslint-disable-next-line no-unused-vars
  changeActiveImage: (direction: 'up' | 'down') => void;
}

const dotsList = [1, 2, 3];

const ImageNavigation: React.FC<IProps> = ({
  activeImage,
  changeActiveImage,
}) => {
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        className="focus:outline-0"
        onClick={() => changeActiveImage('down')}
      >
        <BiChevronDown className="rotate-90 w-12 h-12" />
      </button>
      <ul className="flex gap-2 items-center">
        {dotsList.map(dot => (
          <li key={dot}>
            <div
              className={clsx('rounded-full !h-2 !w-2 bg-darkGray', {
                '!h-3 !w-3 !bg-black': dot === activeImage,
              })}
            ></div>
          </li>
        ))}
      </ul>
      <button
        className="focus:outline-0"
        onClick={() => changeActiveImage('up')}
      >
        <BiChevronDown className="-rotate-90 w-12 h-12" />
      </button>
    </div>
  );
};

export default ImageNavigation;
