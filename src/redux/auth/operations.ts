import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

const URL = import.meta.env.VITE_URL;
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

export const googleLogIn = createAsyncThunk(
  'auth/login',
  async (idToken: string, thunkAPI) => {
    try {
      const { data } = await axios.post(
        'authorize/login/google',
        {},
        {
          headers: {
            'x-id-token': idToken,
          },
        }
      );
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
    name?: string;
    surname?: string;
    birthdayDate?: string;
    phoneNumber?: string;
    changePassword?: string;
    repeatPassword?: string;
  },
  { state: RootState }
>('users', async (user, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      throw new Error('Token not found');
    }
    setAuthToken(token);
    const response = await axios.patch(`users/${state.auth.user.id}`, user);
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
      setAuthToken(token);
      const response = await axios.get(`/users/${state.auth.user.id}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserAvatar = async (
  userAvatar: File | null,
  token: string,
  userId: string
) => {
  const formData = new FormData();

  if (userAvatar) formData.append('userAvatar', userAvatar);
  try {
    const response = await axios.patch(`users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to update avatar ${error}`);
  }
};

export const deleteUserAvatar = async (token: string, userId: string) => {
  try {
    const response = await axios.delete(`users/${userId}/avatar`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to delete avatar ${error}`);
  }
};
