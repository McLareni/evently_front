import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from '../container/Container';
import { MainLogo } from '../ui/Logo';
import { FooterLines } from './footerLines';
import { MainLines } from '../main/MainLines';

export const Footer: React.FC = () => {
  const iconsStyles = 'w-6 h-6 mr-6 hover:[color:#9B8FF3] cursor-pointer';

  return (
    <Container className="relative flex pl-[130px] pb-10 pt-10 bg-background">
      <FooterLines/>
      <MainLines/>
      <div className="pr-[159px] flex flex-col gap-[64px]">
        <MainLogo />
        <a href="tel:+380995745676">+380(99) 574 56 76</a>
      </div>
      <nav className="pr-[140px]">
        <Link to="/about" className="block pb-6 hover:font-bold">
          Про нас
        </Link>
        <Link to="/organizers" className="block pb-6 hover:font-bold">
          Організаторам
        </Link>
        <Link to="/office" className="block pb-6 hover:font-bold">
          Кабінет
        </Link>
        <Link
          to="/ReturnsAndPayment"
          className="block hover:font-bold w-[180px]"
        >
          Повернення та оплата
        </Link>
      </nav>
      <nav className="pr-[190px]">
        <Link to="/OfferAgreement" className="block pb-6 hover:font-bold">
          Договір-оферта
        </Link>
        <Link to="/PrivacyPolicy" className="block hover:font-bold w-[225px]">
          Політика конфеденційності
        </Link>
      </nav>
      <div>
        Ми у соц. мережах
        <div className="flex mt-6">
          <FaInstagram className={iconsStyles} />
          <FiFacebook className={iconsStyles} />
          <FaViber className={iconsStyles} />
        </div>
      </div>
    </Container>
  );
};
