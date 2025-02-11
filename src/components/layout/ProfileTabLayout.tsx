import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { MainLines } from '../main/MainLines';
import ProfileTab from '../tabProfile/ProfileTab';

export const ProfileTabLayout = () => {
  const { pathname } = useLocation();

  const borderIsHidden = !pathname.includes('admin');

  return (
    <main className="flex gap-[25px] relative p-[0px_55px_55px_55px] ">
      <MainLines />
      <ProfileTab />

      <section
        className={`rounded-[20px] py-4 px-[15px] w-full h-auto ${borderIsHidden ? '' : 'border border-buttonPurple border-spacing-8'}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
