import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EventState {
  eventImages: string[]; 
}

const initialState: EventState = {
  eventImages: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventImages: (state, action: PayloadAction<string[]>) => {
      state.eventImages = action.payload;
    },
  },
});

export const { setEventImages } = eventSlice.actions;

export default eventSlice.reducer;
