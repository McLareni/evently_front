import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { Container } from '../container/Container';
import { SharedBtn } from '../ui';
import { MainLogo } from '../ui/Logo';
import { HeaderLines } from './HeaderLines';
import { Navigation } from './Navigation';
import { UserNavigation } from './UserNavigation';
import { VerticalLines } from './VerticalLines';

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    if (isLoggedIn) {
      navigate(link);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="pb-[34px] w-[1440px] font-lato bg-background fixed top-0 z-20">
      <Container className="relative">
        <HeaderLines />
        <header className="p-4 bg-gray-100">
          <div className="flex justify-center items-center h-[84px]">
            <MainLogo />
            <Navigation />
            <UserNavigation
              handleLinkClick={handleLinkClick}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />

            <div onClick={() => handleLinkClick('createEvent')}>
              <SharedBtn
                type="button"
                primary
                className="w-[230px] mx-auto h-12"
              >
                Створити подію
              </SharedBtn>
            </div>
          </div>
        </header>
      </Container>
      <VerticalLines />
    </div>
  );
};
