import apiService from './api.service';
import { GetUserListRequestModel, GetUserListResponseModel } from 'models';


const getUserList = async (data: GetUserListRequestModel) => {
    return await apiService.httpGet<GetUserListResponseModel>(`/users?page=${data.page}&count=${data.count}`);
}

export default { getUserList };