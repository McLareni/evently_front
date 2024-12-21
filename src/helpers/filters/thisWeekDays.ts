import dayjs from 'dayjs';

interface thisWeekDaysProps {
  dayToday: string;
}

export function thisWeekDays({ dayToday }: thisWeekDaysProps) {
  const dayNumber = dayjs(dayToday).day();

  const daysForCalculations = 8;

  const daysToAdd = () => {
    const days = daysForCalculations - dayNumber;
    return days < daysForCalculations ? days : 1;
  };

  let currentDate = dayjs(dayToday);

  const weekDatesArray = [];

  for (let i = 0; i < daysToAdd(); i++) {
    weekDatesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return weekDatesArray;
}
