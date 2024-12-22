import { useEffect, useState } from 'react';

import { getIsCalendarShown } from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

interface useGetFilteredEventsByRangeProps {
  filteredEventsByType: Event[];
  rangeDatesArray: string[];
}

export function useGetFilteredEventsByRange({
  filteredEventsByType,
  rangeDatesArray,
}: useGetFilteredEventsByRangeProps) {
  const [filteredEventsByRange, setFilteredEventsByRange] = useState<Event[]>(
    []
  );

  const isShownCalendar = useAppSelector(getIsCalendarShown);

  const getDateOnly = (date: string) => {
    return date.slice(0, 10);
  };

  useEffect(() => {
    if (isShownCalendar && rangeDatesArray.length !== 0) {
      const filteredArray = filteredEventsByType.filter(item =>
        rangeDatesArray.includes(getDateOnly(item.date.day))
      );
      setFilteredEventsByRange(filteredArray);
      return;
    }
    if (isShownCalendar && rangeDatesArray.length === 0) {
      setFilteredEventsByRange(filteredEventsByType);
      return;
    }
    if (!isShownCalendar) {
      setFilteredEventsByRange([]);
      return;
    }
  }, [filteredEventsByType, isShownCalendar, rangeDatesArray]);

  return { filteredEventsByRange };
}
