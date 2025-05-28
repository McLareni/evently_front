import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { BiMenuAltRight } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { useLocation } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Auth } from '../auth';
import { Modal } from '../ui';
import { AuthMobileModal } from '../ui/AuthMobileModal';
import { IconButton } from '../ui/IconButton';
import { MobileBurgerMenu } from './MobileBurgerMenu';

interface UserNavigationProps {
  // eslint-disable-next-line no-unused-vars
  handleLinkClick: (link: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserNavigation: React.FC<UserNavigationProps> = ({
  handleLinkClick,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const IsLoggedIn = useAppSelector(selectIsLoggedIn);

  const { data: likedEventsAll } = useGetLikedEventsWithSkip();

  const location = useLocation();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('emailConfirmed') === 'true') {
      setIsEmailConfirmed(true);
      setIsModalOpen(true);
    }
    if (params.get('token')) {
      setToken(params.get('token'));
      setIsModalOpen(true);
    }
    return () => setToken(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="flex gap-6 items-center mb-[10px] lg:m-0">
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
        onClick={() => console.log('1')}
        aria-label="geolocation"
      />

      <IconButton
        Icon={AiOutlineHeart}
        onClick={() => handleLinkClick('favourite')}
        aria-label="favourite"
      >
        {likedEventsAll && likedEventsAll.length > 0 && IsLoggedIn && (
          <div className="absolute -right-2 -top-2 w-[20px] h-[20px] rounded-full bg-borderColor flex items-center justify-center">
            <span className="text-background text-[10px]">
              {likedEventsAll.length}
            </span>
          </div>
        )}
      </IconButton>
      <IconButton
        Icon={CgProfile}
        onClick={() => handleLinkClick('user_profile')}
        aria-label="user profile"
      />
      <IconButton
        className="lg:hidden"
        Icon={isBurgerOpen ? AiOutlineClose : BiMenuAltRight}
        onClick={toggleBurgerMenu}
        aria-label="burger"
      />
      {isMobile ? (
        <AuthMobileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hiddenHeader
        >
          <Auth
            onCloseModal={() => setIsModalOpen(false)}
            isEmailConfirmed={isEmailConfirmed}
            resetPasswordByToken={token}
          />
        </AuthMobileModal>
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Auth
            onCloseModal={() => setIsModalOpen(false)}
            isEmailConfirmed={isEmailConfirmed}
            resetPasswordByToken={token}
          />
        </Modal>
      )}
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
