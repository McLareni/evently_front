import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

const URL = 'https://rendereventapp.onrender.com/api/v1/';
axios.defaults.baseURL = `${URL}`;

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterUser, thunkAPI) => {
    try {
      const response = await axios.post('authorize/registration', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (user: LoginUser, thunkAPI) => {
    try {
      const { data } = await axios.post('authorize/login', user);
      if (!data.accessToken) {
        return thunkAPI.rejectWithValue(data);
      }
      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      console.log('ERROR_ON_LOGIN', error);
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserInfo = createAsyncThunk<
  User,
  {
    name: string;
    surname: string;
    birthdayDate: string;
    phoneNumber: string;
  },
  { state: RootState }
>('users', async (user, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.patch(`users/${state.auth.user.id}`, user, {
      headers,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const getUser = createAsyncThunk<User, void, { state: RootState }>(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        throw new Error('Token not found');
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`/users/${state.auth.user.id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
