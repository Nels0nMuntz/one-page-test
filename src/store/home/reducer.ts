import { createReducer } from '@reduxjs/toolkit';

import { Status, UserModel } from 'models';
import { 
    setUserListAction, 
    setHasMoreAction, 
    setUsersPageAction,
    setUsersStatusAction,
} from './actions';


interface HomeState {
    users: {
        page: number;
        count: number;
        hasMore: boolean;
        loading: boolean;
        list: UserModel[];
        status: Status;
    }
};

const initialState: HomeState = {
    users: {
        page: 1,
        count: 6,
        hasMore: true,
        loading: false,
        list: [],
        status: 'initial',
    },
};

export const homeReducer = createReducer(initialState, builder => {
    builder
        .addCase(setUserListAction, (state, action) => {
            state.users.list = [
                ...state.users.list,
                ...action.payload.users,
            ]
        })
        .addCase(setUsersPageAction, (state, action) => {
            state.users.page = action.payload.page
        })
        .addCase(setUsersStatusAction, (state, action) => {
            state.users.status = action.payload.status
        })
        .addCase(setHasMoreAction, (state, action) => {
            state.users.hasMore = action.payload.hasMore
        })
})