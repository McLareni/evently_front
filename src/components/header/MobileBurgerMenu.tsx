import { FC, useState } from 'react';
import { AiOutlineHome, AiOutlineStar } from 'react-icons/ai';
import { BiParty } from 'react-icons/bi';
import { BsPeople, BsPuzzle } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { IoExitOutline, IoTicketOutline } from 'react-icons/io5';
import {
  LiaBasketballBallSolid,
  LiaLaughSquint,
  LiaMicrophoneAltSolid,
} from 'react-icons/lia';
import { PiFire, PiHandshakeLight, PiSuitcaseSimple } from 'react-icons/pi';
import { RiCalendarEventLine } from 'react-icons/ri';
import { VscArrowLeft } from 'react-icons/vsc';
import { useNavigate } from 'react-router';

import { selectIsLoggedIn, selectUser } from '@/redux/auth/selectors';
import { setOneFilterType } from '@/redux/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import userNoPhoto from '../../../public/images/user-logo.jpg';
import BurgerNav from './burgerMenu/BurgerNav';

interface MobileBurgerMenuProps {
  toggleBurgerMenu: () => void;
}

export const MobileBurgerMenu: FC<MobileBurgerMenuProps> = ({
  toggleBurgerMenu,
}) => {
  const [isFullCategories, setIsFullCategories] = useState(false);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { avatarImage, name, email } = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="p-[16px]">
      <div className="flex flex-row gap-3 items-center rounded-[10px] bg-lightPurple/50 px-3 py-[10px]">
        <img
          src={avatarImage?.url || userNoPhoto}
          alt=""
          className="w-[70px] h-[70px] rounded-full"
        />
        <div className="">
          <h2 className="text-base text-textDark font-lato">
            {isLoggedIn ? name : 'Увійти'}
          </h2>
          <p className="text-base text-uploadBtnBg">
            {isLoggedIn ? email : 'user@gmail.com'}
          </p>
        </div>
      </div>
      {isFullCategories && (
        <button className="focus:outline-none">
          <VscArrowLeft
            className="w-6 h-6 mt-3"
            onClick={() => setIsFullCategories(false)}
          />
        </button>
      )}
      <div className="mt-3">
        {isFullCategories ? (
          <>
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={RiCalendarEventLine}
              text="Усі події"
              clickHandler={() => {
                navigate('/all_events');
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={AiOutlineHome}
              text="Під домом"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('UNDER_HOUSE'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={PiFire}
              text="New"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('POPULAR'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={LiaMicrophoneAltSolid}
              text="Концерти"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('CONCERTS'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={AiOutlineStar}
              text="Майстер клас"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('MASTER_CLASS'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={LiaLaughSquint}
              text="Stand-up"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('STAND_UP'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={PiSuitcaseSimple}
              text="Бізнес та нетворкінг"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('BUSINESS_NETWORKING'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={LiaBasketballBallSolid}
              text="Спортивні заходи"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('SPORTS_EVENTS'));
              }}
            />
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={BsPuzzle}
              text="Інше"
              clickHandler={() => {
                navigate('/all_events');
                dispatch(setOneFilterType('OTHER'));
              }}
            />
          </>
        ) : (
          <>
            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={BiParty}
              text="Події"
              isArrow
              clickHandler={() => setIsFullCategories(true)}
            />

            {isLoggedIn && (
              <>
                <BurgerNav
                  toggleBurgerMenu={toggleBurgerMenu}
                  Icon={GoPeople}
                  text="Мої події"
                  url="/my-event"
                />
                <BurgerNav
                  toggleBurgerMenu={toggleBurgerMenu}
                  Icon={IoTicketOutline}
                  text="Мої квитки"
                  url="/"
                />
              </>
            )}

            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={PiHandshakeLight}
              text="Організаторам"
              url="/organizers"
            />

            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={BsPeople}
              text="Про нас"
              url="/about_us"
            />

            <BurgerNav
              toggleBurgerMenu={toggleBurgerMenu}
              Icon={IoExitOutline}
              text="Вихід"
            />
          </>
        )}
      </div>
    </div>
  );
};
