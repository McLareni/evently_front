import { useEffect } from 'react';
import { CgSoftwareDownload } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import { usePDF } from '@react-pdf/renderer';

import { SharedBtn } from '../ui';
import { PDF } from './TicketPDF';

interface Action3FreeMobileProps {
  event: Event | undefined;
}

export const Action3FreeMobile: React.FC<Action3FreeMobileProps> = ({
  event,
}) => {
  const [instance, updateInstance] = usePDF({
    document: undefined,
  });

  useEffect(() => {
    if (event) {
      updateInstance(<PDF event={event} />);
    }
  });

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2>Ви придбали квиток!</h2>
      <div
        className={`font-lato text-[16px] bg-[url('/images/ticket/downloadMobile.png')] h-[100px]
      bg-[length:100%_100%] bg-fill bg-no-repeat bg-center flex flex-col gap-[10px] px-8 py-2 mt-auto`}
      >
        <h2 className="text-base font-bold font-lato">
          Ваш квиток вже чекає вас на пошті!
        </h2>
        <p>
          Номер замовлення<span></span>
        </p>
        {event && instance.url && (
          <a
            href={instance.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center mx-auto"
          >
            <span>Скачати</span>
            <CgSoftwareDownload size={24} />
          </a>
        )}
      </div>
      <Link to="/my_tickets">
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
