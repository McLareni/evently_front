import { FC } from 'react';
import { BiParty } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaChevronRight, FaRegHeart } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { IoExitOutline, IoTicketOutline } from 'react-icons/io5';
import { PiFire, PiHandshakeLight } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

interface MobileBurgerMenuProps {
  toggleBurgerMenu: () => void;
}

const burgerNav = `flex items-center justify-between
border-t-[1px] border-buttonPurple py-4`;
const burgerNavItem = `flex items-center gap-2`;

export const MobileBurgerMenu: FC<MobileBurgerMenuProps> = ({
  toggleBurgerMenu,
}) => {
  return (
    <div className="p-[16px]">
      <NavLink onClick={toggleBurgerMenu} to="/all_events">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <BiParty />
            <p>Події</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/all_events">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <PiFire />
            <p>Популярні</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/organizers">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <PiHandshakeLight />
            <p>Організаторам</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/about_us">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <BsPeople />
            <p>Про нас</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/favourite">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <FaRegHeart />
            <p>Збережені</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/my-event">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <GoPeople />
            <p>Мої події</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <NavLink onClick={toggleBurgerMenu} to="/">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <IoTicketOutline />
            <p>Мої квитки</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
      <button className="w-full">
        <div className={burgerNav}>
          <div className={burgerNavItem}>
            <IoExitOutline />
            <p>Мої квитки</p>
          </div>
          <FaChevronRight />
        </div>
      </button>
      <NavLink onClick={toggleBurgerMenu} to="/">
        <div className={`${burgerNav} border-b-[1px]`}>
          <div className={burgerNavItem}>
            <CgProfile />
            <p>Мій профіль</p>
          </div>
          <FaChevronRight />
        </div>
      </NavLink>
    </div>
  );
};
