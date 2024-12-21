import { expect, test } from 'vitest';

import { filterByPrice } from './filterByPrice';

const filteredEventsByDateOrRangeResult = [
  { price: 0 },
  { price: 1 },
  { price: 500 },
  { price: 501 },
  { price: 1000 },
] as Event[];

const filteredEventsByDateOrRangeResultZero = [{ price: 0 }] as Event[];

test('returns an array of filtered events by price or an empty array', () => {
  // empty
  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult: filteredEventsByDateOrRangeResultZero,
      selectedPrices: [1000],
    })
  ).toEqual([]);

  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [1500],
    })
  ).toEqual([]);

  // all
  expect(
    filterByPrice({ filteredEventsByDateOrRangeResult, selectedPrices: [] })
  ).toEqual(filteredEventsByDateOrRangeResult);

  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [0, 500, 1000],
    })
  ).toEqual(filteredEventsByDateOrRangeResult);

  // 0
  expect(
    filterByPrice({ filteredEventsByDateOrRangeResult, selectedPrices: [0] })
  ).toEqual([{ price: 0 }]);

  // 1-500
  expect(
    filterByPrice({ filteredEventsByDateOrRangeResult, selectedPrices: [500] })
  ).toEqual([{ price: 1 }, { price: 500 }]);

  // 500-1000
  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [1000],
    })
  ).toEqual([{ price: 500 }, { price: 501 }, { price: 1000 }]);

  // 0-500
  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [0, 500],
    })
  ).toEqual([{ price: 0 }, { price: 1 }, { price: 500 }]);

  // 1-1000
  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [500, 1000],
    })
  ).toEqual([{ price: 1 }, { price: 500 }, { price: 501 }, { price: 1000 }]);

  // 0 && 500-1000
  expect(
    filterByPrice({
      filteredEventsByDateOrRangeResult,
      selectedPrices: [0, 1000],
    })
  ).toEqual([{ price: 0 }, { price: 500 }, { price: 501 }, { price: 1000 }]);
});
