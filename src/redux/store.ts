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

import { EventApi } from './admin/eventApi';
import { UserApi } from './admin/userApi';
import { authReducer } from './auth/authSlice';
import eventReducer from './events/eventSlice';
import { EventsApi } from './events/operations';
import { filterReducer } from './filters/filtersSlice';

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
  event: eventReducer,
  [EventsApi.reducerPath]: EventsApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [EventApi.reducerPath]: EventApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(EventsApi.middleware)
      .concat(UserApi.middleware)
      .concat(EventApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
