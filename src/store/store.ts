import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { campaignApi } from '../services/campaignApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, campaignApi.middleware),
});
