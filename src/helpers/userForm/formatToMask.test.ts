import { expect, test } from 'vitest';

import { formatBirthDateToMask, formatPhoneToMask } from './formatToMask';

test('converts YYYY-MM-DD to mask format DD.MM.YYYY', () => {
  expect(formatBirthDateToMask(null)).toBe('');
  expect(formatBirthDateToMask('')).toBe('');
  expect(formatBirthDateToMask('2024-02-15')).toBe('15.02.2024');
});

test('converts 380931112233 to mask format +38(093)111-22-33', () => {
  expect(formatBirthDateToMask(null)).toBe('');
  expect(formatPhoneToMask('')).toBe('');
  expect(formatPhoneToMask('380931112233')).toBe('+38(093)111-22-33');
});
