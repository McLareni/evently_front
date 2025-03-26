import React from 'react';
import { Link } from 'react-router-dom';


import logo from '/images/logo.svg';
import logoLetter from '../../../public/images/letter_O.svg';

export const MainLogo: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to={'/'}
      className="relative w-[84px] h-[88px] flex items-center justify-center"
      onClick={scrollToTop}
    >
      <div className="relative group w-full h-full">
        <img
          src={logo}
          alt="Logo"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Букви "о" на лініях */}
        <div className="absolute flex space-x-2 top-[63%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
          <img src={logoLetter} className="w-[14px] group-hover:-translate-y-2 transition-transform duration-300" />
          <img src={logoLetter} className="w-[14px] group-hover:-translate-y-2 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};
