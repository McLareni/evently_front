import { useMediaQuery } from '../useMediaQuery';

export const useMediaVariables = () => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return {
    isMobile,
    isDesktop,
  };
};
