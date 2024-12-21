import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { store } from '../store';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    const token = store.getState().auth.token;

    try {
      const response = await axios.get('admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
