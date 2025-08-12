import React from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

interface iProps {
  to: string;
  text: string;
  Icon: React.ComponentType<any>;
}

const MobileProfileTabNavLink: React.FC<iProps> = ({ to, text, Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(`flex flex-row gap-2 flex-nowrap py-1`, {
          'border-b-2 border-buttonPurple': isActive,
        })
      }
    >
      <Icon className="h-6 w-6" />
      <h3 className='text-nowrap text-base text-textDark font-normal'>{text}</h3>
    </NavLink>
  );
};

export default MobileProfileTabNavLink;
