import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// import { RootState } from '@reduxjs/toolkit/query';

// const URL = import.meta.env.VITE_MOCK_API_USER_URL;
const URL = 'https://rendereventapp.onrender.com/api/v1/';
axios.defaults.baseURL = `${URL}`;

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterUser, thunkAPI) => {
    try {
      const response = await axios.post('authorize/registration', user);

      // setAuthToken(response.data.token);
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (user: LoginUser, thunkAPI) => {
    try {
      const { data } = await axios.post('authorize/login', user);
      console.log(data);

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

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // await axios.post('users/logout');
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch('/users/edit', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: { token: string | null } };
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('You are not logged in');
    }

    try {
      setAuthToken(persistedToken);
      const response = await axios.get('users/current');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as { auth: { user: { id: string } } };
    console.log(state);

    const response = await axios.get('/users/' + state.auth.user.id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
