import tickets from '../../../../public/images/TicketsBanner.png';

const Banner1 = () => {
  return (
    <div className="w-full h-full rounded-[20px] bg-bg-gradient p-[48px_70px_34px_59px]">
      <h1 className="text-8xl text-center mb-[56px] text-title">
        Ми відкрилися!
      </h1>
      <div className="flex">
        <div className=" text-center">
          <h2 className="text-5xl text-title mb-8 mt-[6px]">
            Шукай події, купуй квитки, створюй власне свято вже сьогодні!
          </h2>
          <button
            className={`bg-dark-gradient w-[421px] h-12 rounded-[71px_8px] mx-auto text-background text-2xl
                hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive`}
          >
            Обрати подію
          </button>
        </div>
        <img src={tickets} alt="banner image" className="w-[479px] h-[340px]" />
      </div>
    </div>
  );
};

export default Banner1;
