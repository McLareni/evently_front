import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Lottie from '@lottielab/lottie-player/react';

const Banner1 = () => {
  const background = useRef(null);
  const animation = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (background.current) {
      const parentWidth = (background.current as HTMLElement).offsetWidth;
      const parentHeight = (background.current as HTMLElement).offsetHeight;
      setWidth(parentWidth);
      setHeight(parentHeight);
    }
    if (animation.current) {
      const childLeft = (animation.current as HTMLElement).offsetLeft;
      setLeft(childLeft);
    }
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
      <div className="absolute w-[180px] lg:w-[650px] bg-transparent -mt-16 -bottom-0 -right-6 lg:right-8 lg:-bottom-28">
        <Lottie
          src="https://cdn.lottielab.com/l/5SmcsiuKdxyQoa.json"
          autoplay
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Banner1;
