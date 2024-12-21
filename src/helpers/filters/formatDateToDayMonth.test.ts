import { expect, test } from 'vitest';

import { formatDateToDayMonth } from './formatDateToDayMonth';

test('formats date string YYYY.MM.DD to DD MM in Ukrainian', () => {
  expect(formatDateToDayMonth('2024-01-15')).toBe('15 січня');
  expect(formatDateToDayMonth('2024-02-13')).toBe('13 лютого');
  expect(formatDateToDayMonth('2024-03-20')).toBe('20 березня');
  expect(formatDateToDayMonth('2024-04-25')).toBe('25 квітня');
  expect(formatDateToDayMonth('2024-05-15')).toBe('15 травня');
  expect(formatDateToDayMonth('2024-06-13')).toBe('13 червня');
  expect(formatDateToDayMonth('2024-07-20')).toBe('20 липня');
  expect(formatDateToDayMonth('2024-08-25')).toBe('25 серпня');
  expect(formatDateToDayMonth('2024-09-12')).toBe('12 вересня');
  expect(formatDateToDayMonth('2024-10-13')).toBe('13 жовтня');
  expect(formatDateToDayMonth('2024-11-01')).toBe('1 листопада');
  expect(formatDateToDayMonth('2024-12-25')).toBe('25 грудня');
  expect(formatDateToDayMonth('2024-02-29')).toBe('29 лютого');
  expect(formatDateToDayMonth('2024/01/15')).toBe('15 січня');
  expect(formatDateToDayMonth('2024.02.13')).toBe('13 лютого');
});
