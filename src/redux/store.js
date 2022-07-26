import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { kapustaApi } from './kapustaAPI';
import userSlice from './reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'refreshToken', 'sid'],
};
const persReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    [userSlice.name]: persReducer,
    [kapustaApi.reducerPath]: kapustaApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(kapustaApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
