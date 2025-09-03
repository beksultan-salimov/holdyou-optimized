import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { uiSlice } from './uiSlice';
import { checkoutSlice } from './checkoutSlice';
import { psychologistSlice } from './psychologistSlice';
import { servicesSlice } from './servicesSlice';
import { authSlice } from './authSlice';
import { mainQuizSlice } from './mainQuizSlice';
import { specialOfferSlice } from './specialOfferSlice';

import { dashboardSlice } from '@/cabinet/store/dashboardSlice';
import { balanceSlice } from '@/cabinet/store/balanceSlice';
import { tasksSlice } from '@/cabinet/store/tasksSlice';
import { agoraSlice } from '@/cabinet/store/agoraSlice';
import { notificationsSlice } from '@/cabinet/store/notificationsSlice';
import { historySessionsSlice } from '@/cabinet/store/historySessionsSlice';
import { historyPaymentsSlice } from '@/cabinet/store/historyPaymentsSlice';

export const store = configureStore({
  reducer: {
    [uiSlice.name]: uiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [checkoutSlice.name]: checkoutSlice.reducer,
    [psychologistSlice.name]: psychologistSlice.reducer,
    [servicesSlice.name]: servicesSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
    [balanceSlice.name]: balanceSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [historySessionsSlice.name]: historySessionsSlice.reducer,
    [historyPaymentsSlice.name]: historyPaymentsSlice.reducer,
    [agoraSlice.name]: agoraSlice.reducer,
    [mainQuizSlice.name]: mainQuizSlice.reducer,
    [specialOfferSlice.name]: specialOfferSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
