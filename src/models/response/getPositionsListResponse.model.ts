import { UserPositionModel } from '../common/userPosition.model';
import { ResponseBaseModel } from "../common/responseBase.model";

export interface GetPositionsListResponse extends ResponseBaseModel {
    positions: UserPositionModel[];
};