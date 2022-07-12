import { ResponseBaseModel } from "../common/responseBase.model";

export interface GetTokenResponseModel extends ResponseBaseModel {
    token: string;
};