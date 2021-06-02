import { User } from "src/app/models/user/user.model";
import { BaseResponse } from "../base.response.model";

export interface GetUserResponse extends BaseResponse {
    user: User;
    userActive: boolean;
}