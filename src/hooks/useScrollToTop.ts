import { useEffect } from 'react';

export function useScrollToTop() {
  const scrollTo = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return scrollTo;
}
