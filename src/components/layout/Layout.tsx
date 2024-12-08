import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useResetAllFiltersAfterRouting } from '@/hooks/filters/useResetAllFiltersAfterRouting';

import { Header } from '../header/Header';
import { MainLines } from '../main/MainLines';
import { Footer } from '../footer/footer';

export const Layout = () => {
  useResetAllFiltersAfterRouting();

  return (
    <>
      <Header />
      <main className="pt-[150px]">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <MainLines />
      </main>
      <Footer />
    </>
  );
};
