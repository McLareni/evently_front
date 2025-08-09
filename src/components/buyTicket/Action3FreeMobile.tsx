import { CgSoftwareDownload } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import { SharedBtn } from '../ui';

interface Action3FreeMobileProps {
  event: Event | undefined;
}

export const Action3FreeMobile: React.FC<Action3FreeMobileProps> = ({
  event,
}) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h2>Ви придбали квиток!</h2>
      <p>Ваш квиток вже чекає на вас на пошті</p>
      <div
        className={`font-lato text-[16px] bg-[url('/images/ticket/downloadMobile.png')] h-[100px]
      bg-[length:100%_100%] bg-fill bg-no-repeat bg-center flex flex-col px-8 mt-auto`}
      >
        <p>Номер замовлення</p>
        <div className="flex items-center">
          <p>Скачати</p>
          <CgSoftwareDownload size={24} />
        </div>
      </div>
      <Link to="/my-event">
        <SharedBtn
          type="button"
          primary
          className="bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px] mx-auto"
        >
          До моїх квитків
        </SharedBtn>
      </Link>
    </div>
  );
};
