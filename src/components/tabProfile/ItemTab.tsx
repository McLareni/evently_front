import React, { ReactElement } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import clsx from 'clsx';

interface IProps {
  item: {
    title: string;
    url: string;
    icon: ReactElement;
  };
  title: string;
  openTab: () => void;
  isOpen?: boolean;
  isAdminTab?: boolean;
}

const ItemTab: React.FC<IProps> = ({
  item,
  title,
  openTab,
  isOpen,
  isAdminTab,
}) => {
  const isAdmin = item.title === 'Адміністрування';
  const user = useAppSelector(selectUser);

  if (user.role !== 'ADMIN' && isAdmin) {
    return;
  }

  return (
    <li key={title}>
      <NavLink
        to={item.url}
        end
        onClick={isAdmin ? () => openTab() : () => {}}
        className={({ isActive }) =>
          clsx(
            'w-full pt-[11px] pb-[10px]  flex gap-2 rounded-[15px] border border-transparent mb-[3px] hover:border-buttonPurple',
            {
              'bg-buttonPurple text-background': isActive && !isAdmin,
              'text-textDark': !isActive,
              'pl-[60px]': isAdminTab,
              'pl-7': !isAdminTab,
            }
          )
        }
      >
        {item.icon}
        <p className="text-[24px] leading-6">{title}</p>
        {isAdmin &&
          (isOpen ? (
            <BiChevronDown className="w-6 h-6" />
          ) : (
            <BiChevronUp className="w-6 h-6" />
          ))}
      </NavLink>
    </li>
  );
};

export default ItemTab;
