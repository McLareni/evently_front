import Lottie from '@lottielab/lottie-player/react';

const Banner1 = () => {
  return (
    <div className="w-full h-full rounded-[20px] bg-bg-gradient p-[48px_70px_34px_59px]">
      <h1 className="text-8xl text-center mb-[56px] text-title">
        Квитки — це просто!
      </h1>
      <div className="flex">
        <div className=" text-center">
          <h2 className="text-5xl text-title mb-8 mt-[6px]">
            Все просто: створюй подію, керуй учасниками, продавай квитки.
          </h2>
          <button
            className={`bg-dark-gradient w-[421px] h-12 rounded-[71px_8px] mx-auto text-background text-2xl
                hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive`}
          >
            Як це працює?
          </button>
        </div>
        <div className="relative">
          <Lottie
            src="https://cdn.lottielab.com/l/5SmcsiuKdxyQoa.json"
            autoplay
            className="w-[400px] bg-transparent -mt-16"
          />
          <div className="w-32 h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
