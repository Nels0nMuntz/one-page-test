
import { createAsyncThunk } from '@reduxjs/toolkit';

import { homeService } from 'api';
import { GetUserListRequestModel } from 'models';
import {
    setUserListAction,
    setHasMoreAction,
    setUsersPageAction,
    setUsersStatusAction,
} from './actions';


export const getUserListThunk = createAsyncThunk<void, GetUserListRequestModel>(
    "GET_USER_LIST",
    async ({ page, count }, thunkApi) => {
        try {
            thunkApi.dispatch(setUsersStatusAction({ status: 'running' }));
            const data = await homeService.getUserList({ page, count });
            const users = data.users;
            thunkApi.dispatch(setUserListAction({ users }));
            thunkApi.dispatch(setUsersStatusAction({ status: 'success' }));

            if (data.total_pages > data.page) {
                thunkApi.dispatch(setUsersPageAction({ page: ++(data.page) }));
            } else {
                thunkApi.dispatch(setHasMoreAction({ hasMore: false }));
            }
        } catch (error) {
            console.log({error});
            
            thunkApi.dispatch(setUsersStatusAction({ status: 'error' }));
        };
    }
);