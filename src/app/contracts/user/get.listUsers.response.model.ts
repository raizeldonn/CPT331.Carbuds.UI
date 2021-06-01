import { User } from "src/app/models/user/user.model";
import { BaseResponse } from "../base.response.model";

export interface GetListUsersResponse extends BaseResponse {
    users: User[];
}