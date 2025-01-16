import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTypes: [] as string[],
  selectedDates: [] as string[],
  rangeDatesArray: [] as string[],
  selectedPrices: [] as number[],
  isCalendarShown: false,
  startDate: undefined as string | undefined,
  endDate: undefined as string | undefined,
  filteredEventsId: [] as string[],
  firstRender: true,
  userCoordinates: null as null | Coordinates,
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addSelectedTypes(state, action: { payload: string[] }) {
      state.selectedTypes = action.payload;
    },
    addSelectedDates(state, action: { payload: string[] }) {
      state.selectedDates = action.payload;
    },
    addRangeDatesArray(state, action: { payload: string[] }) {
      state.rangeDatesArray = action.payload;
    },
    addSelectedPrices(state, action: { payload: number[] }) {
      state.selectedPrices = action.payload;
    },
    setIsCalendarShown(state, action: { payload: boolean }) {
      state.isCalendarShown = action.payload;
    },
    setDateRange(
      state,
      action: {
        payload: { start: string | undefined; end: string | undefined };
      }
    ) {
      state.startDate = action.payload.start;
      state.endDate = action.payload.end;
    },
    clearDateRange(state) {
      state.startDate = undefined;
      state.endDate = undefined;
    },
    setFilteredEventsId(state, action: { payload: string[] }) {
      state.filteredEventsId = action.payload;
    },
    resetAllFilters(state) {
      state.selectedTypes = [];
      state.selectedDates = [];
      state.rangeDatesArray = [];
      state.selectedPrices = [];
      state.isCalendarShown = false;
      state.startDate = undefined;
      state.endDate = undefined;
      state.filteredEventsId = [];
      state.firstRender = true;
      state.userCoordinates = null;
    },
    setOneFilterType(state, action: { payload: string }) {
      state.selectedTypes = [action.payload];
      state.selectedDates = [];
      state.rangeDatesArray = [];
      state.selectedPrices = [];
      state.isCalendarShown = false;
      state.startDate = undefined;
      state.endDate = undefined;
      state.filteredEventsId = [];
    },
    setFirstRender(state, action: { payload: boolean }) {
      state.firstRender = action.payload;
    },
    setUserCoordinates(state, action: { payload: Coordinates }) {
      state.userCoordinates = action.payload;
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
} = filtersSlice.actions;
