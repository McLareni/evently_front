import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from '../container/Container';
import { MainLines } from '../main/MainLines';
import { MainLogo } from '../ui/Logo';
import { FooterLines } from './footerLines';

export const Footer: React.FC = () => {
  const iconsStyles = 'w-6 h-6 mr-6 hover:[color:#9B8FF3] cursor-pointer';

  return (
    <Container className="relative flex pl-[130px] pb-10 pt-10 bg-background ">
      <FooterLines />
      <MainLines />
      <div className="pr-[175px] flex flex-col gap-[43px] ">
        <MainLogo className='!h-[68px] !w-[62px]' letters='!w-[10px]'/>
        <a href="tel:+380995745676" className='text-sm hover:font-bold'>+380(99) 574 56 76</a>
      </div>
      <nav className="pr-[193px]">
        <Link to="/all_events" className="block pb-4 hover:font-bold text-sm">
          Події
        </Link>
        <Link to="/about" className="block pb-4 hover:font-bold text-sm">
          Про нас
        </Link>
        <Link to="/organizers" className="block pb-4 hover:font-bold text-sm w-[110px]">
          Організаторам
        </Link>
        <Link to="/office" className="block pb-4 hover:font-bold text-sm">
          Кабінет
        </Link>
      </nav>
      <nav className="pr-[190px]">
        <Link to="/OfferAgreement" className="block pb-4 hover:font-bold text-sm">
          Договір-оферта
        </Link>
        <Link to="/PrivacyPolicy" className="block pb-4 hover:font-bold w-[225px] text-sm">
          Політика конфіденційності
        </Link>
        <Link
          to="/ReturnsAndPayment"
          className="block hover:font-bold w-[180px] text-sm"
        >
          Повернення та оплата
        </Link>
      </nav>
      <div>
        <p className='cursor-default text-sm'>
          Ми у соц. мережах
        </p>
        <div className="flex mt-4">
          <FaInstagram className={iconsStyles} />
          <FiFacebook className={iconsStyles} />
          <FaViber className={iconsStyles} />
        </div>
      </div>
    </Container>
  );
};
