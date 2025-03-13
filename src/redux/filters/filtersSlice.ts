import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Range {
  start: string | undefined;
  end: string | undefined;
}

const initialState = {
  selectedTypes: [] as string[],
  selectedDates: [] as string[],
  rangeDatesArray: [] as string[],
  selectedPrices: [] as number[],
  isCalendarShown: false,
  range: {
    start: undefined,
    end: undefined,
  } as unknown as Range,
  filteredEventsId: [] as string[],
  firstRender: true,
  userCoordinates: null as null | Coordinates,
  isNearbyFromHeader: false,
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addSelectedTypes(state, action: PayloadAction<string[]>) {
      state.selectedTypes = action.payload;
    },
    addSelectedDates(state, action: PayloadAction<string[]>) {
      state.selectedDates = action.payload;
    },
    addRangeDatesArray(state, action: PayloadAction<string[]>) {
      state.rangeDatesArray = action.payload;
    },
    addSelectedPrices(state, action: PayloadAction<number[]>) {
      state.selectedPrices = action.payload;
    },
    setIsCalendarShown(state, action: PayloadAction<boolean>) {
      state.isCalendarShown = action.payload;
    },
    setDateRange(state, action: PayloadAction<Range>) {
      state.range.start = action.payload.start;
      state.range.end = action.payload.end;
    },
    clearDateRange(state) {
      state.range.start = undefined;
      state.range.end = undefined;
    },
    setFilteredEventsId(state, action: PayloadAction<string[]>) {
      state.filteredEventsId = action.payload;
    },
    resetAllFilters(state) {
      console.log('clear');

      state.selectedTypes = [];
      state.selectedDates = [];
      state.rangeDatesArray = [];
      state.selectedPrices = [];
      state.isCalendarShown = false;
      state.range.start = undefined;
      state.range.end = undefined;
      state.filteredEventsId = [];
      state.firstRender = true;
      state.userCoordinates = null;
    },
    setOneFilterType(state, action: PayloadAction<string>) {
      state.selectedTypes = [action.payload];
      state.selectedDates = [];
      state.rangeDatesArray = [];
      state.selectedPrices = [];
      state.isCalendarShown = false;
      state.range.start = undefined;
      state.range.end = undefined;
      state.filteredEventsId = [];
    },
    setFirstRender(state, action: PayloadAction<boolean>) {
      state.firstRender = action.payload;
    },
    setUserCoordinates(state, action: PayloadAction<Coordinates>) {
      state.userCoordinates = action.payload;
    },
    removeNearby(state) {
      state.selectedTypes = state.selectedTypes.filter(
        item => item !== 'UNDER_HOUSE'
      );
    },
    setIsNearbyFromHeader(state, action: PayloadAction<boolean>) {
      state.isNearbyFromHeader = action.payload;
    },
  },
});

export const filterReducer = filtersSlice.reducer;

export const {
  addRangeDatesArray,
  addSelectedDates,
  addSelectedPrices,
  addSelectedTypes,
  setIsCalendarShown,
  setDateRange,
  clearDateRange,
  setFilteredEventsId,
  resetAllFilters,
  setOneFilterType,
  setFirstRender,
  setUserCoordinates,
  removeNearby,
  setIsNearbyFromHeader,
} = filtersSlice.actions;
