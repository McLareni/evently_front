import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import clsx from 'clsx';

import { MainLines } from '../main/MainLines';
import ProfileTab from '../tabProfile/ProfileTab';

export const ProfileTabLayout = () => {
  const { pathname } = useLocation();

  const isAdminMenu = pathname.includes('admin');

  return (
    <main
      className={clsx(
        'flex relative p-[0px_55px_55px_55px]',
        isAdminMenu ? 'gap-[16px]' : 'gap-[25px]'
      )}
    >
      <MainLines />
      <ProfileTab />

      <section
        className={`rounded-[20px] w-full h-auto ${isAdminMenu ? 'border border-buttonPurple border-spacing-8 py-4' : ''}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
