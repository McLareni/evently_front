import React, { useEffect, useRef, useState } from 'react';

import Lottie from '@lottielab/lottie-player/react';

import PrivateLink from '@/components/ui/PrivateLink';

interface Banner2Props {
  // eslint-disable-next-line no-unused-vars
  setUpdatePosition: (fn: () => void) => void;
}

const Banner2: React.FC<Banner2Props> = ({ setUpdatePosition }) => {
  const background = useRef(null);
  const animation = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [left, setLeft] = useState(0);

  const updatePosition = () => {
    if (!background.current || !animation.current) return;

    const parentRect = background.current.getBoundingClientRect();
    const childRect = animation.current.getBoundingClientRect();

    setWidth(parentRect.width);
    setHeight(parentRect.height);
    setLeft(childRect.left - parentRect.left);
  };

  useEffect(() => {
    setUpdatePosition(() => updatePosition);

    updatePosition();

    const ro = new ResizeObserver(updatePosition);
    ro.observe(background.current!);
    ro.observe(animation.current!);

    window.addEventListener('resize', updatePosition);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, [setUpdatePosition]);

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
        className="bg-bg-gradient absolute w-[230px] h-[40px] bottom-0 lg:bottom-10 right-28 lg:right-[70px] z-50"
      ></div>
      <h1 className="text-xl lg:text-8xl font-bold font-unifractur text-end mr-20 mb-6 lg:mb-[56px] text-title z-10 relative">
        Організовуєш події?
      </h1>
      <div className="text-center ml-[150px] lg:ml-[670px] z-10 relative">
        <h2 className="text-base lg:text-5xl text-title mb-4 lg:mb-8 mt-[6px] !leading-normal">
          Реєструйся та продавай квитки легко та швидко!
        </h2>
        <PrivateLink
          to="create_event"
          className={`bg-dark-gradient w-[180px] lg:w-[421px] h-8 lg:h-12 rounded-[71px_8px] mx-auto text-background text-sm lg:text-2xl
                hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive flex items-center justify-center`}
        >
          Створити подію
        </PrivateLink>
      </div>
      <div className="absolute -bottom-0 lg:-bottom-40 -left-2 lg:-left-16 w-[180px] lg:w-[800px] bg-transparent -mt-16">
        <Lottie
          src="https://cdn.lottielab.com/l/BLYBUKdX2CJM24.json"
          autoplay
          className="w-full -rotate-6"
        />
      </div>
    </div>
  );
};

export default Banner2;
