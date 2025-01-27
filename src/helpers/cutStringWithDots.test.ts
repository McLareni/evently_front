import { expect, test } from 'vitest';

import { cutStringWithDots } from './cutStringWithDots';

test('cuts string and adds dots', () => {
  expect(cutStringWithDots('string', 5)).toBe('strin...');
  expect(cutStringWithDots('string', 2)).toBe('st...');
  expect(cutStringWithDots('string', 6)).toBe('string');
});
