import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Container } from '../container/Container';
import { MobileSlider } from './MobileSlider';

interface TopEventsProps {
  filteredEvents: Event[];
}

export const TopEvents: React.FC<TopEventsProps> = ({ filteredEvents }) => {
  const { isMobile } = useMediaVariables();

  const editedListEvents: Event[] = filteredEvents?.map(event => ({
    ...event,
    category: 'NEW_EVENTS',
  }));

  return (
    <div>
      <Container>
        <h1
          className={clsx('lg:mb-[32px] mb-4', {
            'text-[28px] leading-normal': isMobile,
          })}
        >
          Нові події
        </h1>
      </Container>
      <div className="lg:pl-[60px] lg:pr-0 px-4 relative">
        <MobileSlider events={editedListEvents} />
        {/* Slider Mobile and Desktop */}
      </div>
    </div>
  );
};
