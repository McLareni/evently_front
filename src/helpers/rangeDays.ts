import dayjs from 'dayjs';

interface rangeDaysProps {
  startRange: Date | null;
  endRange: Date | null;
}

export function rangeDays({ startRange, endRange }: rangeDaysProps) {
  const start = dayjs(startRange);
  const end = dayjs(endRange);

  const daysToAdd = () => {
    const difference = end.diff(start, 'day');
    return difference;
  };

  let currentDate = dayjs(start);

  const rangeDatesArray = [];

  if (daysToAdd() === 0) {
    rangeDatesArray.push(currentDate.format('YYYY-MM-DD'));
  }

  for (let i = 0; i < daysToAdd(); i++) {
    rangeDatesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return rangeDatesArray;
}