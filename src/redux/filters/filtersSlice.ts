import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTypes: [] as string[],
  selectedDates: [] as string[],
  rangeDatesArray: [] as string[],
  selectedPrices: [] as number[],
  isCalendarShown: false,
  filteredEventsId: [] as string[],
  firstRender: true,
  userCoordinates: null as null | Coordinates,
  isNearbyFromHeader: false,
  city: '' as string,
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
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
    setFilteredEventsId(state, action: PayloadAction<string[]>) {
      state.filteredEventsId = action.payload;
    },
    resetAllFilters(state) {
      state.selectedTypes = [];
      state.selectedDates = [];
      state.rangeDatesArray = [];
      state.selectedPrices = [];
      state.isCalendarShown = false;
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
  setFilteredEventsId,
  resetAllFilters,
  setOneFilterType,
  setFirstRender,
  setUserCoordinates,
  removeNearby,
  setIsNearbyFromHeader,
  setCity,
} = filtersSlice.actions;
