/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  clearAuthToken,
  getUser,
  logIn,
  register,
  updateUserInfo,
} from '@/redux/auth/operations';

import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

export interface GoogleLoginResponse {
  name: string;
  email: string;
  token: string;
}

export interface UserLoggingFulfilled {
  user: User;
  token: null | string;
}

const STATUS = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const actionGenerators = [register, logIn];

// eslint-disable-next-line no-unused-vars
const getActionGeneratorsWithType: (status: string) => any[] = status =>
  actionGenerators.map(generator => (generator as any)[status]);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null as null | number,
    user: { name: '', email: '' } as User,
    token: null as null | string,
    currentDate: Date.now(),
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },

  reducers: {
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },

    googleLogin(state, action: PayloadAction<GoogleLoginResponse>) {
      const { name, email, token } = action.payload;
      state.user.name = name;
      state.user.email = email;
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
    },

    handleLogOut(state) {
      clearAuthToken();
      state.user = { name: '', email: '' } as User;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, handleGetFullInfomation)
      .addCase(updateUserInfo.pending, handleUpdateUserInfoPending)
      .addCase(updateUserInfo.fulfilled, handleUpdateUserFulfilled)
      .addCase(updateUserInfo.rejected, handleUpdateUserRejected)
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleUserLoggingFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.REJECTED)),
        handleUserRejected
      );
  },
});

function handleUpdateUserInfoPending(state: any) {
  console.log('pending');

  state.isLoading = true;
}

function handleUpdateUserFulfilled(state: any, action: PayloadAction<User>) {
  console.log('fulfilled', action.payload.name);

  state.isLoading = false;
  state.user.name = action.payload.name;
  state.user.surname = action.payload.surname;
  state.user.phoneNumber = action.payload.phoneNumber;
  state.user.birthdayDate = action.payload.birthdayDate;
}

function handleUpdateUserRejected(state: any, action: any) {
  console.log('error', action.payload.name);

  state.isLoading = false;
  state.error = action.payload;
}

function handleUserLoggingFulfilled(state: any, action: any) {
  state.user.id = action.payload.userId;
  state.user.name = action.payload.userName;
  state.token = action.payload.accessToken;
  state.user.userId = action.payload.userId;
  state.user.userSurname = action.payload.userSurname;
  state.isLoggedIn = true;
  state.error = null;
  state.avatarImage = action.payload.avatarImage;
}

function handleUserRejected(state: { error: any }, action: any) {
  state.error = action.payload;
}

function handleGetFullInfomation(
  state: { user: User },
  action: PayloadAction<User>
) {
  console.log('payload', action.payload);

  state.user = action.payload;
}

export const { handleLogOut, setCurrentDate, googleLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;
