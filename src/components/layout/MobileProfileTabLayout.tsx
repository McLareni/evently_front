import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoPeople } from 'react-icons/go';
import { IoTicketOutline } from 'react-icons/io5';
import { Outlet } from 'react-router';

import MobileProfileTabNavLink from '../header/burgerMenu/MobileProfileTabNavLink';

const MobileProfileTabLayout: React.FC = () => {
  return (
    <main>
      <aside className="flex flex-row flex-nowrap gap-4 overflow-x-auto scrollbar-hide pt-5 border-b border-[#6B7280]">
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
      </aside>
      <div className="p-4">
        <Outlet />
      </div>
    </main>
  );
};

export default MobileProfileTabLayout;
