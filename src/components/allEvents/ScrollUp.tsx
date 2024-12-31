import { useEffect, useState } from 'react';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { useLocation } from 'react-router';

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight < window.scrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!url.pathname.includes('/all_events')) {
    return <></>;
  }

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        className="fixed right-[60px] bottom-[60px] focus:outline-none z-20"
      >
        <FaCircleArrowUp className="h-10 w-10 fill-borderColor bg-white rounded-full active:-translate-y-4" />
      </button>
    )
  );
};

export default ScrollUp;
