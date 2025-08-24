import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import arrow from '../../../public/images/Arrow.svg';
import eventPhoto from '../../../public/images/EventPhoto.svg';
import eventPhotoForm from '../../../public/images/EventPhotoForm.svg';
import profileEvents from '../../../public/images/ProfileEnents.svg';
import ArrowSvg from './ArrowSvg';

const WhyBookMyEvent = () => {
  const { isMobile } = useMediaVariables();

  return (
    <>
      <div className="mb-6 lg:mb-16">
        <h1 className="m-auto mb-4 lg:mb-8 text-[32px] lg:text-[64px] leading-normal text-start lg:text-center">
          Чому BookMyEvent?
        </h1>
        <div className="flex text-center lg:flex-row flex-col">
          <div className="lg:w-[349px] w-full lg:mr-[33px] mr-0">
            <p className="font-oswald pb-4 lg:pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-xl lg:text-[32px]">
              Створюй події за кілька кліків
            </p>
            <img className="w-full" src={eventPhotoForm} alt="" />
          </div>
          {isMobile ? (
            <ArrowSvg />
          ) : (
            <img src={arrow} alt="" className="mr-4 h-[229px] mt-[170px]" />
          )}
          <div className="w-full lg:w-[450px] mr-[14px]">
            <p className="font-oswald pb-4 lg:pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-xl lg:text-[32px]">
              Все прозоро - без прихованих комісій
            </p>
            <img src={eventPhoto} alt="" className="m-auto" />
          </div>
          {isMobile ? (
            <ArrowSvg />
          ) : (
            <img src={arrow} alt="" className="mr-4 h-[229px] mt-[170px]" />
          )}
          <div className="w-full lg:w-[349px]">
            <p className="font-oswald w-[312px] m-auto pb-4 lg:pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-xl lg:text-[32px]">
              Контролюй продажі та заробляй
            </p>
            <img src={profileEvents} alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyBookMyEvent;
