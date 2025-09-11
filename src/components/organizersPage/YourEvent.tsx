import image from '../../../public/images/YourEvent_image.svg';
import PrivateLink from '../ui/PrivateLink';
import { SharedBtn } from '../ui/SharedBtn';

const YourEvent = () => {
  return (
    <>
      <div className="flex mb-16 pt-3 lg:pt-0 lg:flex-row flex-col-reverse">
        <div className="max-w-[563px] lg:mr-[109px] lg:pt-[162px] text-center lg:text-start">
          <h1
            className="lg:mb-8 mb-4 lg:pb-6 pb-0 text-transparent lg:text-[64px] text-[32px] 
          leading-normal bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]"
          >
            Твій івент — твої можливості
          </h1>
          <p className="pb-8 lg:text-2xl text-base">
            Збирай гостей, продавай квитки, отримуй прибуток
          </p>
          <PrivateLink to="/create_event">
            <SharedBtn type="button" primary className="w-[312px] h-12">
              Створити подію
            </SharedBtn>
          </PrivateLink>
        </div>
        <div className="">
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default YourEvent;
