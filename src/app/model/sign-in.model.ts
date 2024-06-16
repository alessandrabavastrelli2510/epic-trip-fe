import { User } from "./user.model";

export interface SignIn{
    user: User;
    password: string;
}