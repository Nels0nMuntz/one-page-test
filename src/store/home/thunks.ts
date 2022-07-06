
import { createAsyncThunk } from '@reduxjs/toolkit';

import { homeService } from 'api';
import { GetUserListRequestModel } from 'models';
import {
    setUserListAction,
    setHasMoreAction,
    setUsersPageAction,
    setUsersLoadingAction,
} from './actions';


export const getUserListThunk = createAsyncThunk<void, GetUserListRequestModel>(
    "GET_USER_LIST",
    async ({ page, count }, thunkApi) => {
        thunkApi.dispatch(setUsersLoadingAction({ loading: true }));
        try {
            const data = await homeService.getUserList({ page, count });
            const users = data.users;
            thunkApi.dispatch(setUserListAction({ users }));
            thunkApi.dispatch(setUsersLoadingAction({ loading: false }));

            if (data.total_pages > data.page) {
                thunkApi.dispatch(setUsersPageAction({ page: ++(data.page) }));
            } else {
                thunkApi.dispatch(setHasMoreAction({ hasMore: false }));
            }
        } catch (error) {
            thunkApi.dispatch(setUsersLoadingAction({ loading: false }));
        };
    }
);