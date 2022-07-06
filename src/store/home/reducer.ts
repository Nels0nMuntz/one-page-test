import { createReducer } from '@reduxjs/toolkit';

import { UserModel } from 'models';
import { 
    setUserListAction, 
    setHasMoreAction, 
    setUsersPageAction,
    setUsersLoadingAction,
} from './actions';


interface HomeState {
    users: {
        page: number;
        count: number;
        hasMore: boolean;
        loading: boolean;
        list: UserModel[];
    }
};

const initialState: HomeState = {
    users: {
        page: 1,
        count: 24,
        hasMore: true,
        loading: false,
        list: [],
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
        .addCase(setUsersLoadingAction, (state, action) => {
            state.users.loading = action.payload.loading
        })
        .addCase(setHasMoreAction, (state, action) => {
            state.users.hasMore = action.payload.hasMore
        })
})