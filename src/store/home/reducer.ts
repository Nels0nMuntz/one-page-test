import { createReducer } from '@reduxjs/toolkit';

import { Status, UserModel, UserPositionModel } from 'models';
import { 
    setUserListAction, 
    clearUserListAction,
    setHasMoreAction, 
    setUsersPageAction,
    setUsersStatusAction,
    setPositiosListAction,
    setUsersSubmitStatusAction,
    setRegistrationTokenAction,
} from './actions';


interface HomeState {
    users: {
        page: number;
        count: number;
        hasMore: boolean;
        list: UserModel[];
        status: Status;
        submitStatus: Status;
    },
    positions: {
        list: UserPositionModel[];
    },
    registrationToken: string | null;
};

const initialState: HomeState = {
    users: {
        page: 1,
        count: 6,
        hasMore: true,
        list: [],
        status: 'initial',
        submitStatus: 'initial',
    },
    positions: {
        list: [],
    },
    registrationToken: null,
};

export const homeReducer = createReducer(initialState, builder => {
    builder
        .addCase(setUserListAction, (state, action) => {
            state.users.list = [
                ...state.users.list,
                ...action.payload.users,
            ]
        })
        .addCase(clearUserListAction, (state) => {
            state.users.list = [];
        })
        .addCase(setUsersPageAction, (state, action) => {
            state.users.page = action.payload.page;
        })
        .addCase(setUsersStatusAction, (state, action) => {
            state.users.status = action.payload.status;
        })
        .addCase(setUsersSubmitStatusAction, (state, action) => {
            state.users.submitStatus = action.payload.submitStatus;
        })
        .addCase(setHasMoreAction, (state, action) => {
            state.users.hasMore = action.payload.hasMore;
        })
        .addCase(setPositiosListAction, (state, action) => {
            state.positions.list = action.payload.list;
        })
        .addCase(setRegistrationTokenAction, (state, action) => {
            state.registrationToken = action.payload.token;
        })
})