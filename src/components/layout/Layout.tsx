import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useResetAllFiltersAfterRouting } from '@/hooks/filters/useResetAllFiltersAfterRouting';

import { Footer } from '../footer/footer';
import { Header } from '../header/Header';
import { MainLines } from '../main/MainLines';
import { LayoutHorizontalLines } from './LayoutHorizontalLines';

export const Layout = () => {
  useResetAllFiltersAfterRouting();

  const route = useLocation().pathname;

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
        className={`${linesShown ? 'pt-[140px]' : 'pt-[108px]'}
        relative flex-grow w-[1440px]`}
      >
        {linesShown && <LayoutHorizontalLines />}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <MainLines />
      </main>
      <Footer />
    </>
  );
};
