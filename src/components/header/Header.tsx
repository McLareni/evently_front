import React, { useState } from 'react';

import { Container } from '../container/Container';
import { SharedBtn } from '../ui';
import { MainLogo } from '../ui/Logo';
import PrivateLink from '../ui/PrivateLink';
import CityPicker from './CityPicker';
import { Navigation } from './Navigation';
import { UserNavigation } from './UserNavigation';
import { VerticalLines } from './VerticalLines';

export const Header: React.FC = () => {
  const [cityPickerIsOpen, setCityPickerIsOpen] = useState(false);

  return (
    <div className="w-full max-w-[1440px] font-lato bg-background fixed transform -translate-x-1/2 left-1/2 top-0 z-20 lg:border-none border-b border-buttonPurple pb-0">
      <Container className="relative">
        <header className="lg:px-4 lg:pt-2 lg:pb-4 bg-gray-100 flex justify-center">
          <div className="mx-auto w-full flex justify-between items-center h-[73px] lg:h-[84px]">
            <MainLogo />
            <Navigation />
            <UserNavigation
              openCityPicker={() => setCityPickerIsOpen(prev => !prev)}
            />

            <PrivateLink to={'create_event'} className="hidden lg:block">
              <SharedBtn
                type="button"
                primary
                className="w-[230px] mx-auto h-12"
              >
                Створити подію
              </SharedBtn>
            </PrivateLink>
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
