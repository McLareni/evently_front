import { expect, test } from 'vitest';

import { rangeDays } from './rangeDays';

const startRange = '2024-12-10T22:00:00.000Z';
const endRange = '2024-12-15T22:00:00.000Z';

test('returns an array of dates', () => {
  expect(
    rangeDays({
      startRange,
      endRange,
    })
  ).toEqual([
    '2024-12-11',
    '2024-12-12',
    '2024-12-13',
    '2024-12-14',
    '2024-12-15',
    '2024-12-16',
  ]);

  expect(
    rangeDays({
      startRange,
      endRange: startRange,
    })
  ).toEqual(['2024-12-11']);
});
