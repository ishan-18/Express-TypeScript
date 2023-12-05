import Joi from 'joi';
import { IPostDetails } from '../../interfaces/post';
import { IAddressDetails, IPhoneDetails, IUserDetails } from '../../interfaces/user';
import { UserRole } from '../enums';

export const phoneValidator = Joi.object<IPhoneDetails>({
    country_isd_code: Joi.string()
        .required()
        .messages({
            'any.required': 'country_isd_code is required.',
            'string.base': 'country_isd_code must be a string.',
        }),
    number: Joi.string()
        .required()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
            'any.required': 'number is required.',
            'string.base': 'number must be a string.',
            'string.pattern.base': 'Invalid number format. It should start with a digit between 6 and 9 and have a total of 10 digits.',
        }),
});

export const addressValidator = Joi.object<IAddressDetails>({
    street: Joi.string().required().messages({
        'any.required': 'street is required.',
        'string.base': 'street must be a string.',
    }),
    city: Joi.string().required().messages({
        'any.required': 'city is required.',
        'string.base': 'city must be a string.',
    }),
    state: Joi.string().required().messages({
        'any.required': 'state is required.',
        'string.base': 'state must be a string.',
    }),
    postalCode: Joi.string().required().messages({
        'any.required': 'postalCode is required.',
        'string.base': 'postalCode must be a string.',
    }),
    country: Joi.string().required().messages({
        'any.required': 'country is required.',
        'string.base': 'country must be a string.',
        'string.empty': 'country must not be empty'
    }),
});;

export const userRegisterValidator = Joi.object<IUserDetails>({
    _id: Joi.string().default(Joi.ref('$uuidv4')).optional(), // Assuming $uuidv4 is passed as an external context variable
    name: Joi.string().required().min(2).messages({
        'any.required': 'Name is required.',
        'string.min': 'Name must be at least 2 characters long.',
    }),
    email: Joi.string().required().email().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email format.',
    }),
    password: Joi.string().required().min(4).max(15).messages({
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least 4 characters long.',
        'string.max': 'Password must not exceed 15 characters.',
    }),
    phone: phoneValidator,
    address: addressValidator,
    role: Joi.string().valid(UserRole.NORMALUSER, UserRole.ADMIN).default(UserRole.NORMALUSER),
}).options({ abortEarly: false });

export const userLoginValidator = Joi.object<IUserDetails>({
    email: Joi.string().required().email().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email format.',
    }),
    password: Joi.string().required().min(4).max(15).messages({
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least 4 characters long.',
        'string.max': 'Password must not exceed 15 characters.',
    })
})

export const postValidator = Joi.object<IPostDetails>({
    title: Joi.string().required().messages({
        'any.required': 'Title is required.',
        'string.empty': 'Title cannot be empty.',
    }),
    desc: Joi.string().required().messages({
        'any.required': 'Description is required.',
        'string.empty': 'Description cannot be empty.',
    }),
    is_offensive: Joi.boolean().default(false),
    report: Joi.boolean().default(false),
    user: Joi.string().guid().messages({
        'string.guid': 'User ID must be a valid UUID.',
    }),
});
