import { useScreenWidth } from '@/hooks/useScreenWidth';
import clsx from 'clsx';

import { ListEvents } from '../listEvents/ListEvents';

interface AllEventsProps {
  events: Event[];
  title: string | boolean;
}

export const AllEvents: React.FC<AllEventsProps> = ({ events, title }) => {
  const width = useScreenWidth();

  return (
    <div className={`flex flex-col lg:gap-8 gap-4`}>
      {title && (
        <h1
          className={clsx({
            'text-[28px] leading-normal': width < 1024,
          })}
        >
          {title}
        </h1>
      )}
      <ListEvents events={events} />
    </div>
  );
};
