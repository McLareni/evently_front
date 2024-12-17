import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  IoExitOutline,
  IoNotificationsOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { PiFlowerLotusLight } from 'react-icons/pi';
import { TbCalendarEvent } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

import { handleLogOut } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';

import clsx from 'clsx';

import ItemTab from './ItemTab';
import TabModal from './TabModal';

const tabUser = [
  {
    title: 'Мій профіль',
    icon: <CgProfile className="w-6 h-6" />,
    url: 'user_profile',
  },
  {
    title: 'Збережені',
    icon: <AiOutlineHeart className="w-6 h-6" />,
    url: 'favourite',
  },
  {
    title: 'Мої події',
    icon: <IoTicketOutline className="w-6 h-6" />,
    url: 'my-event',
  },
  {
    title: 'Адміністрування',
    icon: <GrUserAdmin className="w-6 h-6" />,
    url: 'admin/users',
  },
];

const tabAdmin = [
  {
    title: 'Користувачі',
    icon: <HiOutlineUsers className="w-6 h-6" />,
    url: 'admin/users',
  },
  {
    title: 'Події',
    icon: <TbCalendarEvent className="w-6 h-6" />,
    url: 'admin/events',
  },
  {
    title: 'Промо події',
    icon: <PiFlowerLotusLight className="w-6 h-6" />,
    url: 'admin/promo-events',
  },
  {
    title: 'Сповіщення',
    icon: <IoNotificationsOutline className="w-6 h-6" />,
    url: 'admin/notifications',
  },
];

const ProfileTab = () => {
  const [isActiveAdmin, setIsActiveAdmin] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { pathname } = useLocation();
  const { t } = useTranslation('tabProfile');
  const dispatch = useAppDispatch();

  const tabs = t('tabs', { returnObjects: true });

  const handleOpenAdminTab = () => {
    setIsActiveAdmin(prev => !prev);
  };

  const handleLogout = () => {
    setConfirmLogout(false);
    dispatch(handleLogOut());
  };

  const startLogout = () => {
    setConfirmLogout(true);
  };

  const endLogout = () => {
    setConfirmLogout(false);
  };

  useEffect(() => {
    if (pathname.includes('admin')) {
      setIsActiveAdmin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="w-[290px] min-h-[700px] h-auto border border-buttonPurple rounded-[20px] px-1">
        <ul className="mt-[21px]">
          {tabUser.map((item, index) => (
            <ItemTab
              key={item.title}
              item={item}
              openTab={handleOpenAdminTab}
              isOpen={isActiveAdmin}
              title={tabs[index]}
            />
          ))}
          {isActiveAdmin && (
            <>
              {tabAdmin.map((item, index) => (
                <ItemTab
                  key={item.title}
                  title={tabs[index + 4]}
                  item={item}
                  openTab={() => {}}
                  isAdminTab
                />
              ))}
            </>
          )}
        </ul>
        <button
          onClick={startLogout}
          className={clsx(
            'w-full pt-[11px] pb-[10px] pl-7 flex gap-2 text-start text-textDark text-[24px] leading-6 rounded-[15px] border border-transparent ' +
              'hover:border-buttonPurple hover:outline-0 ' +
              'active:bg-buttonPurple active:text-white '
          )}
        >
          <IoExitOutline className="w-6 h-6" />
          {t('logout')}
        </button>
      </nav>
      <TabModal
        isOpen={confirmLogout}
        clickYes={handleLogout}
        onClose={endLogout}
      />
    </>
  );
};

export default ProfileTab;
