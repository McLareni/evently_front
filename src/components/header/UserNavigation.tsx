import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgMenuRightAlt, CgProfile } from 'react-icons/cg';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { AuthMobileModal } from '../ui/AuthMobileModal';
import { IconButton } from '../ui/IconButton';
import PrivateLink from '../ui/PrivateLink';
import { MobileBurgerMenu } from './burgerMenu/MobileBurgerMenu';

interface UserNavigationProps {
  openCityPicker: () => void;
}

export const UserNavigation: React.FC<UserNavigationProps> = ({
  openCityPicker,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const IsLoggedIn = useAppSelector(selectIsLoggedIn);

  const { data: likedEventsAll } = useGetLikedEventsWithSkip();

  const inputRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const toggleInput = () => setIsInputVisible(!isInputVisible);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsInputVisible(false);
    }
  };

  useEffect(() => {
    if (isInputVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputVisible]);

  return (
    <div className="flex gap-6 items-center lg:m-0">
      <button
        onClick={toggleInput}
        className="focus:outline-none"
        aria-label="search"
      >
        <BsSearch className="hidden lg:block w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
      </button>
      {isInputVisible && (
        <div
          ref={inputRef}
          className="absolute top-[20px] left-[240px] rounded-[20px] w-[1137px] bg-lightPurple flex items-center z-50"
        >
          <div className="flex items-center w-[1162px]  h-[70px] px-4">
            <BsSearch className="w-[24px] h-[24px] mr-2" />
            <input
              type="text"
              placeholder="Пошук..."
              className="w-full p-2 bg-transparent text-gray-600 focus:outline-none"
            />
            <RxCross2
              className="h-[32px] w-[32px] cursor-pointer"
              onClick={() => setIsInputVisible(false)}
            />
          </div>
        </div>
      )}
      <IconButton
        className="lg:hidden"
        Icon={HiOutlineLocationMarker}
        onClick={openCityPicker}
        aria-label="geolocation"
      />

      <PrivateLink to="favourite">
        <IconButton Icon={AiOutlineHeart} aria-label="favourite">
          {likedEventsAll && likedEventsAll.length > 0 && IsLoggedIn && (
            <div className="absolute -right-2 -top-2 w-[20px] h-[20px] rounded-full bg-borderColor flex items-center justify-center">
              <span className="text-background text-[10px]">
                {likedEventsAll.length}
              </span>
            </div>
          )}
        </IconButton>
      </PrivateLink>
      <PrivateLink to="user_profile">
        <IconButton Icon={CgProfile} aria-label="user profile" />
      </PrivateLink>
      <IconButton
        className="lg:hidden"
        Icon={isBurgerOpen ? AiOutlineClose : CgMenuRightAlt}
        onClick={toggleBurgerMenu}
        aria-label="burger"
      />
      {isMobile && isBurgerOpen && (
        <AuthMobileModal
          isOpen={isBurgerOpen}
          onClose={toggleBurgerMenu}
          hiddenCross
        >
          <MobileBurgerMenu toggleBurgerMenu={toggleBurgerMenu} />
        </AuthMobileModal>
      )}
      <div className="hidden lg:block">UA</div>
    </div>
  );
};
