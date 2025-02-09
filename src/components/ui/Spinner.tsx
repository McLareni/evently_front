import React from 'react';

import clsx from 'clsx';

interface IProps {
  rounded?: boolean;
}

const Spinner: React.FC<IProps> = ({ rounded = false }) => {
  console.log('spinner');

  return (
    <div
      className={clsx(
        'fixed z-50 flex items-center justify-center inset-0 bg-slate-500 bg-opacity-50',
        { 'rounded-[19px]': rounded }
      )}
    >
      <div className="w-60 h-60 rounded-full overflow-hidden bg-background relative  scale-50">
        <div className="w-[1000px] h-60 absolute [transform:rotateY(180deg)] animate-wave2">
          <svg
            className="relative h-96"
            viewBox="0 0 1000 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-lightPurple"
              d="M0,150 C150,-50 250,350 400,100 C550,-100 650,400 800,50 C950,-150 1050,300 1200,50 C1350,-100 1450,350 1440,150 L1440,300 L0,300 Z"
            />
          </svg>
        </div>
        <div className="w-[1000px] h-60 absolute animate-wave1">
          <svg
            className="relative h-96"
            viewBox="0 0 1000 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-lightBlue"
              d="M0,150 C150,-50 250,350 400,100 C550,-100 650,400 800,50 C950,-150 1050,300 1200,50 C1350,-100 1450,350 1440,150 L1440,300 L0,300 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
