import { createAction } from '@reduxjs/toolkit';

import { UserModel } from 'models';


export const setUserListAction = createAction<{ users: UserModel[] }>("SET_USER_LIST");
export const setUsersPageAction = createAction<{ page: number }>("SET_USERS_PAGE");
export const setUsersLoadingAction = createAction<{ loading: boolean }>("SET_USERS_LOADING");
export const setHasMoreAction = createAction<{ hasMore: boolean }>("SET_HAS_MORE");