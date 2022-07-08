import { PostForm } from "../common/postForm.model";

export interface AddUserRequestModel extends PostForm {
    token: string;
};