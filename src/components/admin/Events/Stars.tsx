import React from 'react';
import { IoStarSharp } from 'react-icons/io5';

import clsx from 'clsx';

interface IProps {
  rating: number;
}

let starsList = ['', '', '', '', ''];

const Stars: React.FC<IProps> = ({ rating }) => {
  const halfStar = rating % 1 !== 0;
  const fullStars = halfStar ? rating - 0.5 : rating;

  starsList = starsList.map((star, index) =>
    index + 1 <= fullStars
      ? 'full'
      : index + 1 <= rating + 0.5 && halfStar
        ? 'half'
        : 'none'
  );

  return (
    <ul className="flex">
      {starsList.map((star, index) => {
        return (
          <li key={index}>
            {star === 'half' ? (
              <div className="relative h-6 w-6">
                <IoStarSharp className="absolute inset-0 h-6 w-6 fill-darkGray" />
                <IoStarSharp className="absolute inset-0 h-6 w-6 fill-[#F4E544] clip-half" />
              </div>
            ) : (
              <IoStarSharp
                className={clsx('h-6 w-6', {
                  'fill-[#F4E544]': star === 'full',
                  'fill-darkGray': star === 'none',
                })}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Stars;
