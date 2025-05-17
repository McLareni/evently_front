import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useResetAllFiltersAfterRouting } from '@/hooks/filters/useResetAllFiltersAfterRouting';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { Footer } from '../footer/footer';
import { Header } from '../header/Header';
import { MainLines } from '../main/MainLines';
import { LayoutHorizontalLines } from './LayoutHorizontalLines';

export const Layout = () => {
  useResetAllFiltersAfterRouting();

  const route = useLocation().pathname;
  const width = useScreenWidth();

  const showLines = () => {
    return route === '/' ||
      route === '/create_event' ||
      route.startsWith('/event/')
      ? false
      : true;
  };

  const linesShown = showLines();

  return (
    <>
      <Header />
      <main
        className={`pt-[88px] ${linesShown ? 'lg:pt-[140px]' : 'lg:pt-[108px]'}
        relative flex-grow lg:w-[1440px] w-full`}
      >
        {linesShown && <LayoutHorizontalLines />}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        {width >= 1024 && <MainLines />}
      </main>
      <Footer />
    </>
  );
};
