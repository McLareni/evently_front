import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from '../container/Container';
import { MainLogo } from '../ui/Logo';

export const MobileFooter: React.FC = () => {
  const iconsStyles = 'w-6 h-6 hover:[color:#9B8FF3] cursor-pointer';

  return (
    <Container className="relative flex flex-col bg-background items-center pb-4">
      <div className="">
        <MainLogo className="!h-[68px] !w-[62px]" letters="!w-[10px]" />
      </div>
      <div className='flex flex-col items-center my-4'>
        <p className="cursor-default text-sm">Ми у соц. мережах</p>
        <div className="flex mt-4 w-fit justify-center lg:gap-6 gap-3">
          <FaInstagram className={iconsStyles} />
          <FiFacebook className={iconsStyles} />
          <FaViber className={iconsStyles} />
        </div>
      </div>
      <div className="flex flex-row gap-[18px]">
        <nav className="w-[130px] flex flex-col gap-3">
          <Link to="/all_events" className="hover:font-bold text-sm">
            Події
          </Link>
          <Link to="/about" className="hover:font-bold text-sm">
            Про нас
          </Link>
          <Link
            to="/organizers"
            className="hover:font-bold text-sm w-[110px]"
          >
            Організаторам
          </Link>
          <Link to="/office" className="hover:font-bold text-sm">
            Кабінет
          </Link>
        </nav>
        <nav className="w-[180px] flex flex-col gap-3">
          <Link
            to="/OfferAgreement"
            className="hover:font-bold text-sm"
          >
            Договір-оферта
          </Link>
          <Link
            to="/PrivacyPolicy"
            className="hover:font-bold text-nowrap text-sm"
          >
            Політика конфіденційності
          </Link>
          <Link
            to="/ReturnsAndPayment"
            className="hover:font-bold text-nowrap text-sm"
          >
            Повернення та оплата
          </Link>
        </nav>
      </div>
    </Container>
  );
};
