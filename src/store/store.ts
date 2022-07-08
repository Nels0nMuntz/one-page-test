import { configureStore } from '@reduxjs/toolkit';

import { homeReducer } from './home';
import { notificationReducer } from './notification';


export const store = configureStore({
    reducer: {
        home: homeReducer,
        notification: notificationReducer,
    }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>