import { expect, test } from 'vitest';

import { thisWeekendDays } from './thisWeekendDays';

test('returns an array of this weekend dates', () => {
  expect(
    thisWeekendDays({
      dayToday: '2025-11-12',
    })
  ).toEqual(['2025-11-15', '2025-11-16']);

  expect(
    thisWeekendDays({
      dayToday: '2025-11-16',
    })
  ).toEqual(['2025-11-16']);
});
