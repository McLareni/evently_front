import { expect, test } from 'vitest';

import {
  formatBirthDateFromMask,
  formatPhoneNumberFromMask,
  isValueDate,
} from './formatFromMask';

test('converts from mask format DD.MM.YYYY to YYYY-MM-DD', () => {
  expect(formatBirthDateFromMask('')).toBe('');
  expect(formatBirthDateFromMask('2024-02-15')).toBe('2024-02-15');
});

test('converts from mask format +38(093)111-22-33 to 380931112233', () => {
  expect(formatPhoneNumberFromMask('')).toBe('');
  expect(formatPhoneNumberFromMask('+38(093)111-22-33')).toBe('380931112233');
});

test('checks is date real', () => {
  expect(isValueDate('12.02.1995')).toBe(true);
  expect(isValueDate('32.02.1995')).toBe(false);
  expect(isValueDate('12.13.1995')).toBe(false);
  expect(isValueDate('30.12.2025')).toBe(false);
});
