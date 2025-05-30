import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { Container } from '../container/Container';
import { SharedBtn } from '../ui';
import { MainLogo } from '../ui/Logo';
import CityPicker from './CityPicker';
import { Navigation } from './Navigation';
import { UserNavigation } from './UserNavigation';
import { VerticalLines } from './VerticalLines';

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityPickerIsOpen, setCityPickerIsOpen] = useState(false);

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
    <div className="w-full max-w-[1440px] font-lato bg-background fixed transform -translate-x-1/2 left-1/2 top-0 z-20 ">
      <Container className="relative">
        <header className="lg:px-4 lg:pt-2 lg:pb-4 bg-gray-100 flex justify-center">
          <div className="mx-auto w-full flex justify-between items-center h-[62px] lg:h-[84px]">
            <MainLogo />
            <Navigation />
            <UserNavigation
              handleLinkClick={handleLinkClick}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              openCityPicker={() => setCityPickerIsOpen(true)}
            />

            <div
              className="hidden lg:block"
              onClick={() => handleLinkClick('create_event')}
            >
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

      <CityPicker
        isOpen={cityPickerIsOpen}
        close={() => setCityPickerIsOpen(false)}
      />

      <VerticalLines />
    </div>
  );
};
