import { createAction } from '@reduxjs/toolkit';

import { Status, UserModel, UserPositionModel } from 'models';


export const setUserListAction = createAction<{ users: UserModel[] }>("SET_USER_LIST");
export const clearUserListAction = createAction("CLEAR_USER_LIST");
export const setUsersPageAction = createAction<{ page: number }>("SET_USERS_PAGE");
export const setUsersStatusAction = createAction<{ status: Status }>("SET_USERS_STATUS");
export const setUsersSubmitStatusAction = createAction<{ submitStatus: Status }>("SET_USERS_SUBMIT_STATUS");
export const setHasMoreAction = createAction<{ hasMore: boolean }>("SET_HAS_MORE");
export const setPositiosListAction = createAction<{ list: UserPositionModel[] }>('SET_POSITIONS_LIST');
export const setRegistrationTokenAction = createAction<{ token: string | null }>('SET_REGISTRATION_TOKEN');