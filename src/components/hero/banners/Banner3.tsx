import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Lottie from '@lottielab/lottie-player/react';

interface Banner3Props {
  visible?: boolean;
}

const Banner3: React.FC<Banner3Props> = ({ visible }) => {
  const background = useRef(null);
  const animation = useRef(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [left, setLeft] = useState(300);

  const updatePosition = () => {
    if (!background.current || !animation.current) return;
    const parentRect = (
      background.current as HTMLElement
    ).getBoundingClientRect();
    const childRect = (
      animation.current as HTMLElement
    ).getBoundingClientRect();
    setWidth(parentRect.width);
    setHeight(parentRect.height);
    setLeft(childRect.left - parentRect.left);
  };

  useEffect(() => {
    updatePosition();
    const ro = new ResizeObserver(updatePosition);
    if (background.current) ro.observe(background.current);
    if (animation.current) ro.observe(animation.current);
    window.addEventListener('resize', updatePosition);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div
      ref={background}
      className="w-full h-full rounded-[20px] bg-bg-gradient p-[43px_10px] lg:p-[48px_70px_34px_59px] relative overflow-hidden"
    >
      <div
        ref={animation}
        style={{
          backgroundSize: `${width}px ${height}px`,
          backgroundPosition: `${width - left}px`,
        }}
        className="bg-bg-gradient absolute w-[130px] h-[40px] -bottom-5 lg:bottom-10 -right-6 lg:-right-0 z-50"
      ></div>
      <h1 className="text-xl lg:text-8xl font-bold font-unifractur text-start ml-5 mb-6 lg:mb-[56px] text-title">
        Квитки — це просто!
      </h1>
      <div className="flex">
        <div className="text-center mr-[100px] lg:mr-[500px]">
          <h2 className="text-base lg:text-5xl text-title mb-4 lg:mb-8 lg:mt-[6px] !leading-normal">
            Все просто: створюй подію, керуй учасниками, продавай квитки.
          </h2>
          <Link
            to={'organizers'}
            className={`bg-dark-gradient w-[180px] lg:w-[421px] h-8 lg:h-12 rounded-[71px_8px] mx-auto text-background text-sm lg:text-2xl
                hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive flex items-center justify-center`}
          >
            Як це працює?
          </Link>
        </div>
        <div className="absolute -right-6 lg:-right-10 bottom-3 lg:-bottom-12 w-[180px] lg:w-[600px] bg-transparent">
          {visible && (
            <Lottie
              src="https://cdn.lottielab.com/l/5BoyVD7deA1Kqj.json"
              autoplay
              className="rotate-12"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner3;
