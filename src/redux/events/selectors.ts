import { RootState } from '../store';

export const getAllEvents = (state: RootState) => state.eventsSlice.AllEvents;
