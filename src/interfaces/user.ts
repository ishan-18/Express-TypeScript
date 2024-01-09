import { UserRole } from "../utils/enums";

export interface IAddressDetails {
    street:string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface IPhoneDetails {
    country_isd_code: string,
    number: string
}

export interface IUserDetails{
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: IPhoneDetails;
    address: IAddressDetails;
    profile_image?: string,
    reset_password_token?: string;
    reset_password_expire?: Date;
    role: UserRole.NORMALUSER | UserRole.ADMIN;
}