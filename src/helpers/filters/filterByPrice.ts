interface filterByPriceProps {
  filteredEventsByDateOrRangeResult: Event[];
  selectedPrices: number[];
}

export const filterByPrice = ({
  filteredEventsByDateOrRangeResult,
  selectedPrices,
}: filterByPriceProps) => {
  // all
  if (selectedPrices.length === 0 || selectedPrices.length === 3) {
    return filteredEventsByDateOrRangeResult;
  }
  // 0
  if (selectedPrices.length === 1 && selectedPrices.includes(0)) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price === 0
    );
    return newArray;
  }
  // 1-500
  if (selectedPrices.length === 1 && selectedPrices.includes(500)) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price > 0 && item.price <= 500
    );
    return newArray;
  }
  // 500-1000
  if (selectedPrices.length === 1 && selectedPrices.includes(1000)) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price >= 500 && item.price <= 1000
    );
    return newArray;
  }
  // 0-500
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(500)
  ) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price >= 0 && item.price <= 500
    );
    return newArray;
  }
  // 1-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(500) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price > 0 && item.price <= 1000
    );
    return newArray;
  }
  // 0 && 500-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRangeResult.filter(
      item => item.price === 0 || (item.price >= 500 && item.price <= 1000)
    );
    return newArray;
  }
  return [];
};
