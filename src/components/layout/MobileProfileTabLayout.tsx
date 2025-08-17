import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoPeople } from 'react-icons/go';
import { IoExitOutline, IoTicketOutline } from 'react-icons/io5';
import { Outlet } from 'react-router';

import { handleLogOut } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';

import MobileProfileTabNavLink from '../header/burgerMenu/MobileProfileTabNavLink';

const MobileProfileTabLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(handleLogOut());
  };

  return (
    <main>
      <aside className="flex flex-row flex-nowrap gap-4 overflow-x-auto scrollbar-hide pt-5 px-4 border-b border-[#6B7280]">
        <MobileProfileTabNavLink
          to="/user_profile"
          text="Мій профіль"
          Icon={CgProfile}
        />
        <MobileProfileTabNavLink
          to="/favourite"
          text="Збережені"
          Icon={AiOutlineHeart}
        />
        <MobileProfileTabNavLink
          to="/my-event"
          text="Мої події"
          Icon={GoPeople}
        />
        <MobileProfileTabNavLink
          to="/my-tickets"
          text="Мої квитки"
          Icon={IoTicketOutline}
        />
        <button
          className="flex flex-row gap-2 flex-nowrap py-1 focus:outline-none"
          onClick={handleLogout}
        >
          <IoExitOutline className="h-6 w-6" />
          <h3 className="text-nowrap text-base text-textDark font-normal">
            Вихід
          </h3>
        </button>
      </aside>
      <div className="px-4 py-6">
        <Outlet />
      </div>
    </main>
  );
};

export default MobileProfileTabLayout;
