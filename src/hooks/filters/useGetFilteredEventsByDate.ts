import { useEffect, useState } from 'react';

import {
  getIsCalendarShown,
  getSelectedDates,
} from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

import { thisWeekDays } from '@/helpers/thisWeekDays';
import { thisWeekendDays } from '@/helpers/thisWeekendDays';

interface useGetFilteredEventsByDateProps {
  filteredEventsByType: Event[];
}

export function useGetFilteredEventsByDate({
  filteredEventsByType,
}: useGetFilteredEventsByDateProps) {
  const [filteredEventsByDate, setFilteredEventsByDate] = useState<Event[]>([]);

  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const selectedDates = useAppSelector(getSelectedDates);

  const dayToday = '2025-11-12';

  const todayFilter = selectedDates.includes('Сьогодні');
  const onWeekendFilter = selectedDates.includes('На вихідних');
  const thisWeekFilter = selectedDates.includes('На цьому тижні');

  const thisWeekDaysArray = thisWeekDays({ dayToday });
  const thisWeekendDaysArray = thisWeekendDays({ dayToday });

  useEffect(() => {
    if (selectedDates.length === 0 && !isShownCalendar) {
      setFilteredEventsByDate(filteredEventsByType);
      return;
    }
    if (selectedDates.length === 0 && isShownCalendar) {
      setFilteredEventsByDate([]);
      return;
    }
    // today only
    if (selectedDates.length === 1 && todayFilter) {
      const filteredArray = filteredEventsByType.filter(
        item => item.date.day === dayToday
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // on weekend only
    if (selectedDates.length === 1 && onWeekendFilter) {
      const filteredArray = filteredEventsByType.filter(item =>
        thisWeekendDaysArray.includes(item.date.day)
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // this week
    if (thisWeekFilter) {
      const filteredArray = filteredEventsByType.filter(item =>
        thisWeekDaysArray.includes(item.date.day)
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // today and on weekend
    if (selectedDates.length === 2 && !thisWeekFilter) {
      const filteredArray = filteredEventsByType.filter(
        item =>
          item.date.day === dayToday ||
          thisWeekendDaysArray.includes(item.date.day)
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredEventsByType,
    selectedDates,
    todayFilter,
    thisWeekFilter,
    onWeekendFilter,
    isShownCalendar,
  ]);

  return { filteredEventsByDate };
}
