import React from 'react';
import { useSnackbar } from 'notistack';

import { useAppSelector, useAppDispatch } from './index';
import { removeNotificationAction, selectNotifications } from 'store/notification';


let displayed: Array<string> = [];

const storeDisplayed = (key: string) => displayed.push(key);

const removeDisplayed = (key: string) => displayed = displayed.filter(item => item === key);

export const useNotifier = () => {

    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();   
  
    React.useEffect(() => {
        notifications.forEach(({ key, message, options, dismissed }) => {
            if(dismissed) {
                closeSnackbar(key);
                return;
            };

            if(displayed.includes(key)) {
                return;
            };

            enqueueSnackbar(
                message, 
                {
                    ...options,
                    onEmptied: () => {
                        removeDisplayed(key);
                        dispatch(removeNotificationAction({ key }));
                    },
                },
            );

            storeDisplayed(key);
        });
    }, [notifications]);
};