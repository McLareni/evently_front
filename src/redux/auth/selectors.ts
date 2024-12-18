import { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentDate = (state: RootState) => state.auth.currentDate;
