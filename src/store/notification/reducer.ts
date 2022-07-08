import { createReducer } from '@reduxjs/toolkit';

import { Notification } from 'models';
import {
    openNotificationAction,
    closeNotificationAction,
    removeNotificationAction,
} from './actions';


interface NotificationState {
    notofications: Notification[];
};

const initialState: NotificationState = {
    notofications: []
};

export const notificationReducer = createReducer(initialState, builder => {
    builder
        .addCase(openNotificationAction, (state, action) => {
            state.notofications.push({
                key: Date.now().toString(),
                message: action.payload.message,
                dismissed: false,
                options: {
                    variant: action.payload.variant,
                },
            });
        })
        .addCase(closeNotificationAction, (state, action) => {
            state.notofications.map(notification => notification.key === action.payload.key ? { ...notification, dismissed: false } : notification);
        })
        .addCase(removeNotificationAction, (state, action) => {
            state.notofications.filter(({ key }) => key !== action.payload.key);
        })
})