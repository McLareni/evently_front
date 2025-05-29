import React from 'react';
import { IconType } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

interface IProps {
  toggleBurgerMenu: () => void;
  Icon: IconType;
  text: string;
  isArrow?: boolean;
  url?: string;
  clickHandler?: () => void;
}

const burgerNav = `flex items-center justify-between py-4`;
const burgerNavItem = `flex items-center gap-2`;

const BurgerNav: React.FC<IProps> = ({
  toggleBurgerMenu,
  Icon,
  text,
  url = '',
  isArrow = false,
  clickHandler = () => {},
}) => {
  return url ? (
    <NavLink
      onClick={toggleBurgerMenu}
      to={url}
      className="block border-t-[1px] border-buttonPurple"
    >
      <div className={burgerNav}>
        <div className={burgerNavItem}>
          <Icon className="w-6 h-6" />
          <p className="text-textDark">{text}</p>
        </div>
      </div>
    </NavLink>
  ) : (
    <button
      className="w-full focus:outline-none border-t-[1px] first:border-t-0 border-buttonPurple"
      onClick={() => {
        clickHandler();
        if (text !== 'Події' && text !== 'Вихід') {
          toggleBurgerMenu();
        }
      }}
    >
      <div className={burgerNav}>
        <div className={burgerNavItem}>
          <Icon className="w-6 h-6" />
          <p>{text}</p>
        </div>
        {isArrow && <FaChevronRight />}
      </div>
    </button>
  );
};

export default BurgerNav;
