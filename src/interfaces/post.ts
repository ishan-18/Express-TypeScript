import { IUserDetails } from "./user";

export interface IPostDetails{
    _id: string;
    title: string;
    desc: string;
    is_offensive?: boolean; 
    report?: boolean;
    user: string;
}