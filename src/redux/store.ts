import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/authSlice';
import { EventsApi } from './events/operations';
import { filterReducer } from './filters/filtersSlice';
import { usersReducer } from './users/usersSlice';
import eventReducer from './events/eventSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn', 'user'],
};

const filterPersistConfig = {
  key: 'filter',
  storage,
  whitelist: [
    'selectedTypes',
    'selectedDates',
    'rangeDatesArray',
    'selectedPrices',
    'isCalendarShown',
    'startDate',
    'endDate',
    'filteredEventsId',
    'firstRender',
    'userCoordinates',
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  filter: persistReducer(filterPersistConfig, filterReducer),
  users: usersReducer,
  event: eventReducer,
  [EventsApi.reducerPath]: EventsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(EventsApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
