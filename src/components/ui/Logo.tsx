import React from 'react';
import { Link } from 'react-router-dom';

import logoLetter from '../../../public/images/letter_O.svg';
import logo from '/images/logo.svg';

type LogoProps = {
  className?: string;
  letters?: string;
};

export const MainLogo: React.FC<LogoProps> = ({ className, letters }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to={'/'}
      className={`${className} relative w-[56px] lg:w-[84px] h-[56px] lg:h-[88px] flex items-center justify-center `}
      onClick={scrollToTop}
    >
      <div className="relative group w-full h-full">
        <img
          src={logo}
          alt="Logo"
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="absolute flex space-x-2 top-[63%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={logoLetter}
            className={`${letters} lg:w-[14px] w-[8px] group-hover:-translate-y-2 transition-transform duration-300`}
          />
          <img
            src={logoLetter}
            className={`${letters} lg:w-[14px] w-[8x] group-hover:-translate-y-2 transition-transform duration-300`}
          />
        </div>
      </div>
    </Link>
  );
};
