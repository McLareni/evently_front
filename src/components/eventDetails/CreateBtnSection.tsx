import { Link } from 'react-router-dom';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { MainLogo } from '../ui/Logo';
import PrivateLink from '../ui/PrivateLink';

const CreateBtnSection = () => {
  const { isDesktop, isMobile } = useMediaVariables();

  return (
    <>
      <div className="relative w-auto lg:h-40 h-[152px] lg:m-4 lg:my-16 my-6">
        <div className="absolute inset-0 bg-eventDetails blur-[2.5px] rounded-[20px]"></div>
        <div className="absolute inset-0 bg-background rounded-[20px] opacity-50"></div>
        <div className="absolute inset-0 z-10 flex lg:flex-row flex-col items-center lg:justify-around justify-evenly px-4 lg:px-0">
          {isDesktop && <MainLogo />}
          <h1 className="lg:text-5xl text-2xl text-center">
            Не знайшов подію своєї мрії?{isMobile && <br />} Створи власну!
          </h1>
          <PrivateLink to="/create_event">
            <button
              className="bg-dark-gradient lg:w-[230px] w-[170px] lg:h-12 h-8 rounded-[71px_8px] text-background lg:text-xl text-sm 
            hover:border-4 hover:border-buttonPurple hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive"
            >
              Створити подію
            </button>
          </PrivateLink>
        </div>
      </div>
    </>
  );
};

export default CreateBtnSection;
