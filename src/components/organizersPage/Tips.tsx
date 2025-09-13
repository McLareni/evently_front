const Tips = () => {
  return (
    <>
      <div className="mb-6 lg:mb-16">
        <h1 className="mp-4 lg:mb-8 text-[28px] lg:text-[64px] leading-normal">
          Поради
        </h1>
        <div className="flex border-b lg:border-b-2 pb-6 items-center flex-wrap lg:flex-nowrap">
          <h1 className="text-[32px] lg:text-[64px] leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-6 lg:mr-[69px]">
            01
          </h1>
          <h4 className="w-auto lg:w-[477px] mr-0 lg:mr-[69px] lg:text-4xl text-xl text-nowrap">
            Створюйте привабливий опис події
          </h4>
          <p className="w-auto lg:w-[615px] text-base lg:text-xl leading-tight lg:leading-normal mt-3 lg:mt-0">
            Пишіть опис події, котрий розповідає про суть події, її
            унікальність, та чим вона може бути правблива для участників
          </p>
        </div>
        <div className="flex border-b lg:border-b-2 pb-6 items-center flex-wrap lg:flex-nowrap">
          <h1 className="text-[32px] lg:text-[64px] leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-6 lg:mr-[66px]">
            02
          </h1>
          <h4 className="w-auto lg:w-[480px] mr-0 lg:mr-[69px] lg:text-4xl text-xl text-nowrap">
            Якість фото
          </h4>
          <p className="text-base lg:text-xl w-[648px] leading-tight lg:leading-normal mt-3 lg:mt-0">
            Обирайте якісні фото, фото які будуть відображати атмосферу та
            тематику події,
          </p>
        </div>
        <div className="flex items-center flex-wrap lg:flex-nowrap">
          <h1 className="text-[32px] lg:text-[64px] leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-6 lg:mr-[66px]">
            03
          </h1>
          <h4 className="w-auto lg:w-[477px] mr-0 lg:mr-[69px] lg:text-4xl text-xl text-nowrap">
            Соціальні мережі
          </h4>
          <p className="text-base lg:text-xl leading-tight lg:leading-normal mt-3 lg:mt-0">
            Поділитися подією зі своїми друзями легко
          </p>
        </div>
      </div>
    </>
  );
};

export default Tips;
