import { createAction } from '@reduxjs/toolkit';

import { Status, UserModel } from 'models';


export const setUserListAction = createAction<{ users: UserModel[] }>("SET_USER_LIST");
export const setUsersPageAction = createAction<{ page: number }>("SET_USERS_PAGE");
export const setUsersStatusAction = createAction<{ status: Status }>("SET_USERS_STATUS");
export const setHasMoreAction = createAction<{ hasMore: boolean }>("SET_HAS_MORE");