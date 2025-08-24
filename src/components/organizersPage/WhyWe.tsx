import { BiSolidLock } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiScales } from 'react-icons/gi';

import WhyWeImg from '../../../public/images/WhyWe_businesspeople-meeting-office-working.svg';

const WhyWe = () => {
  return (
    <>
      <div className="mb-6 lg:mb-16">
        <h1 className="pb-4 lg:pb-[32px] text-[28px] lg:text-[64px] leading-normal">
          Чому ми?
        </h1>
        <div className="flex flex-col lg:flex-row">
          <img
            src={WhyWeImg}
            alt=""
            className="mr-0 lg:mr-[64px] mb-6 lg:mb-0"
          />
          <div>
            <div className="flex border-b lg:border-b-2 mb-6 pb-6 px-2 lg:px-0">
              <GiScales className="min-w-8 lg:min-w-12 min-h-8 lg:min-h-12 mr-6 lg:mr-7" />
              <div className="w-auto lg:w-[533px]">
                <h2 className="pb-4 text-xl lg:text-2xl">Безпека та довіра</h2>
                <p className="leading-tight lg:leading-normal ml-[-55px] lg:mr-0">
                  Ми офіційна українська ФОП-компанія. Тому твої кошти під
                  захистом, а дохід надходить напряму.
                </p>
              </div>
            </div>
            <div className="flex border-b lg:border-b-2 mb-6 pb-6">
              <BsFillPeopleFill className="min-w-8 lg:min-w-12 min-h-8 lg:min-h-12 mr-6 lg:mr-7" />
              <div className="w-auto lg:w-[533px]">
                <h2 className="pb-4 text-xl lg:text-2xl">
                  Підтримка організаторів
                </h2>
                <p className="leading-tight lg:leading-normal ml-[-55px] lg:mr-0">
                  Ми не кидаємо тебе наодинці з платформою. Служба підримки на
                  зв&apos;язку 24/7, вирішуємо питання швидко і по-людськи.
                </p>
              </div>
            </div>
            <div className="flex">
              <BiSolidLock className="min-w-8 lg:min-w-12 min-h-8 lg:min-h-12 mr-6 lg:mr-7" />
              <div className="w-auto lg:w-[533px]">
                <h2 className="pb-4 text-xl lg:text-2xl">Захист від шахраїв</h2>
                <p className="leading-tight lg:leading-normal ml-[-55px] lg:mr-0">
                  Ми перевіряємо організаторів та події для безпеки
                  відвідувачів.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyWe;
