import { expect, test } from 'vitest';

import { thisWeekDays } from './thisWeekDays';

test('returns an array of dates from current day to the end of week in format YYYY-MM-DD', () => {
  expect(thisWeekDays({ dayToday: '2024-12-19' })).toEqual([
    '2024-12-19',
    '2024-12-20',
    '2024-12-21',
    '2024-12-22',
  ]);
  expect(thisWeekDays({ dayToday: '2024-12-22' })).toEqual(['2024-12-22']);
  expect(thisWeekDays({ dayToday: '2024.12.22' })).toEqual(['2024-12-22']);
  expect(thisWeekDays({ dayToday: '2024/12/22' })).toEqual(['2024-12-22']);
});
