import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;
export const userId = (state: RootState) => state.auth.userId;
