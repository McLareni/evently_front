import YourSpaceSVG from '../../../public/images/YourSpaceSVG.svg';

const YourSpace = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 mb-6 lg:mb-16 pt-3 lg:pt-3">
      <img src={YourSpaceSVG} alt="Your Space!" />
      <div className="w-full lg:w-[532px]">
        <h1
          className="text-[32px] lg:text-[48px] my-0 lg:my-16 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] 
        text-center lg:text-start leading-tight lg:leading-normal"
        >
          BookMyEvent — твій простір для яскравих подій
        </h1>
        <p className="text-base lg:text-2xl text-center lg:text-start w-auto lg:w-[530px] mt-4 lg:mt-0 mx-8 lg:mx-0">
          Лекції, майстер-класи, бізнес-зустрічі — тут є все. Зручний і швидкий
          спосіб купівлі та продажу квитків.
        </p>
      </div>
    </div>
  );
};

export default YourSpace;
