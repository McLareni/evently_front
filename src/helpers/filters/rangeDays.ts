import dayjs from 'dayjs';

interface rangeDaysProps {
  startRange: string | undefined;
  endRange: string | undefined;
}

export function rangeDays({ startRange, endRange }: rangeDaysProps) {
  const start = dayjs(startRange);
  const end = dayjs(endRange);

  const daysToAdd = () => {
    const difference = end.diff(start, 'day');
    return difference + 1;
  };

  let currentDate = dayjs(start);

  const rangeDatesArray = [];

  for (let i = 0; i < daysToAdd(); i++) {
    rangeDatesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return rangeDatesArray;
}
