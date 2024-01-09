import { string } from 'joi';
import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
import { IAddressDetails, IPhoneDetails, IUserDetails } from '../interfaces/user';
import { UserRole } from '../utils/enums';

const phoneSchema = new Schema<IPhoneDetails>({
    country_isd_code: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true,
        match: /^[6-9]\d{9}$/,
    }
})

const addressSchema = new Schema<IAddressDetails>({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

const userSchema = new Schema<IUserDetails>({
    _id: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    phone: phoneSchema,
    address: addressSchema,
    profile_image: {
        type: String,
        default: ''
    },
    reset_password_token: String,
    reset_password_expire: Date,
    role: {
        type: String,
        enum: [UserRole.NORMALUSER, UserRole.ADMIN],
        default: UserRole.NORMALUSER
    }
}, {
    timestamps: true
})



export default model<IUserDetails>('User', userSchema);




