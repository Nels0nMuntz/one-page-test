import { createAction } from '@reduxjs/toolkit';
import { VariantType } from "notistack";


export const openNotificationAction = createAction<{ message: string, variant: VariantType }>('OPEN_NOTIFICATION');
export const closeNotificationAction = createAction<{ key: string }>('CLOSE_NOTIFICATION');
export const removeNotificationAction = createAction<{ key: string }>('REMOVE_NOTIFICATION');