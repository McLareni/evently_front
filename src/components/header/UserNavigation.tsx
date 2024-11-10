import { useEffect, useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';
import { useLocation } from 'react-router';

import { Auth } from '../auth';
import { Modal } from '../ui';
import { IconButton } from '../ui/IconButton';

interface UserNavigationProps {
  likedEventsCount: number;
  handleLinkClick: (link: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserNavigation: React.FC<UserNavigationProps> = ({
  likedEventsCount,
  handleLinkClick,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const location = useLocation();

  const inputRef = useRef<HTMLDivElement>(null);

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
  }, [location]);

  return (
    <div className="flex gap-6 pr-12 items-center">
      <button onClick={toggleInput} className="focus:outline-none">
        <BsSearch className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
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
              placeholder="Поиск..."
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
        Icon={AiOutlineHeart}
        onClick={() => handleLinkClick('favourite')}
      >
        {likedEventsCount > 0 && (
          <div className="absolute -right-2 -top-2 w-[20px] h-[20px] rounded-full bg-borderColor flex items-center justify-center">
            <span className="text-background text-[10px]">
              {likedEventsCount}
            </span>
          </div>
        )}
      </IconButton>
      <IconButton
        Icon={CgProfile}
        onClick={() => handleLinkClick('user_profile')}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth
          onCloseModal={() => setIsModalOpen(false)}
          isEmailConfirmed={isEmailConfirmed}
          resetPasswordByToken={token}
        />
      </Modal>
      <div>UA</div>
    </div>
  );
};
