
import { createAsyncThunk } from '@reduxjs/toolkit';

import { homeService } from 'api';
import {
    GetUserListRequestModel,
    PostForm,
    PostFormRequired,
    GetUserListResponseModel,
    GetPositionsListResponse,
    AddUserResponseModel,
    GetTokenResponseModel,
} from 'models';
import { openNotificationAction } from 'store/notification';
import { RootState } from 'store/store';
import {
    setUserListAction,
    clearUserListAction,
    setHasMoreAction,
    setUsersPageAction,
    setUsersStatusAction,
    setPositiosListAction,
    setRegistrationTokenAction,
    setUsersSubmitStatusAction,
} from './actions';

const errorMessage = 'Something went wrong';

interface PostUserDataThunkArg extends PostFormRequired {
    token: string;
};

interface GetUserListThunkArg extends Pick<GetUserListRequestModel, "page"> { };

interface AddUserFaildResponseModel extends AddUserResponseModel {
    fails: { [key in keyof PostForm]: string[] };
};


const getTokenThunk = createAsyncThunk(
    'GET_TOKEN',
    async (_, thunkApi) => {
        try {
            const response = await homeService.getToken();
            const data: GetTokenResponseModel = await response.json();
            thunkApi.dispatch(setRegistrationTokenAction({ token: data.token }));
            return data.token;
        } catch (error) {
            thunkApi.dispatch(setUsersSubmitStatusAction({ submitStatus: 'error' }));
            thunkApi.dispatch(openNotificationAction({
                message: 'Something went wrong',
                variant: 'error',
            }));
        };
    },
);

const postUserDataThunk = createAsyncThunk<void, PostUserDataThunkArg>(
    'POST_USER_DATA',
    async (user, thunkApi) => {
        const payload: { [key in keyof PostForm]: string | Blob } = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            position_id: user.position_id.toString(),
        };

        const formData = new FormData();
        for(const [key, value] of Object.entries(payload)) {
            formData.append(key, value);
        };
        
        try {
            const response = await homeService.addUser(formData, user.token);
            const data: AddUserResponseModel = await response.json();
            if (data.success) {
                thunkApi.dispatch(setUsersSubmitStatusAction({ submitStatus: 'success' }));
                thunkApi.dispatch(openNotificationAction({
                    message: data.message || 'New user successfully registered',
                    variant: 'success',
                }));
                thunkApi.dispatch(setRegistrationTokenAction({ token: null }));
                thunkApi.dispatch(clearUserListAction());
                thunkApi.dispatch(getUserListThunk({ page: 1 }));
            } else if (response.status === 409) {
                throw new Error(data.message);
            } else if (response.status === 422) {
                const faildValidationData = data as AddUserFaildResponseModel;
                const message = Object
                    .values(faildValidationData.fails)
                    .reduce(
                        (prev, curr) => {
                            return prev.concat(curr);
                        }, [faildValidationData.message + '.']
                    )
                    .join(' ');
                throw new Error(message);
            } else {
                throw new Error(errorMessage);
            };
        } catch (error: any) {
            thunkApi.dispatch(setUsersSubmitStatusAction({ submitStatus: 'error' }));
            thunkApi.dispatch(openNotificationAction({
                message: error.message,
                variant: 'error',
            }));
        };
    },
);

export const getUserListThunk = createAsyncThunk<void, GetUserListThunkArg>(
    "GET_USER_LIST",
    async ({ page }, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState;
            let count = state.home.users.count
            thunkApi.dispatch(setUsersStatusAction({ status: 'running' }));
            const response = await homeService.getUserList({ page, count });
            const data: GetUserListResponseModel = await response.json();
            if (data.success) {
                const users = data.users;
                thunkApi.dispatch(setUserListAction({ users }));
                thunkApi.dispatch(setUsersStatusAction({ status: 'success' }));

                if (data.total_pages > data.page) {
                    thunkApi.dispatch(setUsersPageAction({ page: ++(data.page) }));
                } else {
                    thunkApi.dispatch(setHasMoreAction({ hasMore: false }));
                }
            } else {
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            thunkApi.dispatch(setUsersStatusAction({ status: 'error' }));
            thunkApi.dispatch(openNotificationAction({
                message: error.message,
                variant: 'error',
            }));
        };
    }
);

export const getPositionsListThunk = createAsyncThunk(
    'GET_POSITIONS_LIST',
    async (_, thunkApi) => {
        try {
            const response = await homeService.getPositionsList();
            const data: GetPositionsListResponse = await response.json();
            if (data.success) {
                thunkApi.dispatch(setPositiosListAction({ list: data.positions }));
            } else {
                throw new Error(data.message);
            };
        } catch (error: any) {
            thunkApi.dispatch(openNotificationAction({
                message: error.message,
                variant: 'error',
            }));
        };
    }
);

export const addUserThunk = createAsyncThunk<void, PostFormRequired>(
    'ADD_USER',
    async (data, thunkApi) => {
        thunkApi.dispatch(setUsersSubmitStatusAction({ submitStatus: 'running' }));

        const state = thunkApi.getState() as RootState;
        const registrationToken = state.home.registrationToken;
        if (!registrationToken) {
            const token = await thunkApi.dispatch(getTokenThunk()).unwrap();
            if (token) {
                thunkApi.dispatch(postUserDataThunk({ ...data, token }));
            };
        } else {
            thunkApi.dispatch(postUserDataThunk({ ...data, token: registrationToken }));
        };
    }
);