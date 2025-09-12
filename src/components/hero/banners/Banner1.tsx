import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Lottie from '@lottielab/lottie-player/react';

interface Banner1Props {
  visible?: boolean;
}

const Banner1: React.FC<Banner1Props> = ({ visible }) => {
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
        className="bg-bg-gradient absolute w-[130px] h-[40px] bottom-0 lg:bottom-10 -right-6 lg:right-[70px] z-50"
      ></div>
      <h1 className="text-xl lg:text-8xl font-bold font-unifractur text-center mb-6 lg:mb-[56px] text-title">
        Ми відкрилися!
      </h1>
      <div className="text-center mr-[125px] lg:mr-[500px]">
        <h2 className="text-base lg:text-5xl text-title mb-[16px] lg:mb-16 mt-[6px] !leading-normal">
          Шукай події, купуй квитки, створюй власне свято вже сьогодні!
        </h2>
        <Link
          to="/all_events"
          className={`bg-dark-gradient w-[180px] lg:w-[421px] h-8 lg:h-12 rounded-[71px_8px] mx-auto text-background text-sm lg:text-2xl
                hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive flex items-center justify-center`}
        >
          Обрати подію
        </Link>
      </div>
      <div className="absolute w-[180px] lg:w-[650px] bg-transparent -mt-16 bottom-4 -right-6 lg:right-8 lg:-bottom-28">
        {visible && (
          <Lottie
            src="https://cdn.lottielab.com/l/5SmcsiuKdxyQoa.json"
            autoplay
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default Banner1;
