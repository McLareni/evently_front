import dayjs from 'dayjs';

interface thisWeekendDaysProps {
  dayToday: string;
}

export function thisWeekendDays({ dayToday }: thisWeekendDaysProps) {
  const dayNumber = dayjs(dayToday).day();

  const daysForCalculations = 8;

  const daysToAdd = () => {
    const days = daysForCalculations - dayNumber;
    return days < daysForCalculations ? 2 : 1;
  };

  let currentDate = '' as unknown as dayjs.Dayjs;

  let currentDate1 = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    daysToAdd() > 1
      ? (currentDate = dayjs(dayToday).day(6))
      : (currentDate = dayjs(dayToday).day(0));
  };
  currentDate1();

  const weekendDatesArray = [];

  for (let i = 0; i < daysToAdd(); i++) {
    weekendDatesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return weekendDatesArray;
}
