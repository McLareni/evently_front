import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useResetAllFiltersAfterRouting } from '@/hooks/filters/useResetAllFiltersAfterRouting';

import { Footer } from '../footer/footer';
import { Header } from '../header/Header';
import { MainLines } from '../main/MainLines';
import { LayoutHorizontalLines } from './LayoutHorizontalLines';

export const Layout = () => {
  useResetAllFiltersAfterRouting();

  return (
    <>
      <Header />
      <main className="pt-[140px] relative flex-grow w-[1440px]">
        <LayoutHorizontalLines />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <MainLines />
      </main>
      <Footer />
    </>
  );
};
