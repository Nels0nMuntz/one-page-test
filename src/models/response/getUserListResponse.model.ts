import { ResponseBaseModel } from "../common/responseBase.model";
import { PaginationParams } from "../common/paginationParams.model";
import { UserModel } from "../common/user.model";

export interface GetUserListResponseModel extends ResponseBaseModel, PaginationParams {
    total_pages: number;
    total_users: number;
    users: UserModel[];
};